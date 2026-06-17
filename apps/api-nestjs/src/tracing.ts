/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
/**
 * OpenTelemetry SDK initialization.
 * This file MUST be the first import in main.ts so that instrumentation patches
 * are applied before any application modules are loaded.
 *
 * Signals pushed directly to Grafana Cloud OTLP gateway (no Alloy):
 *   Traces  -> /v1/traces
 *   Metrics -> /v1/metrics  (PeriodicExportingMetricReader, 60 s interval)
 *   Logs    -> /v1/logs     (bridged from pino via auto-instrumentation)
 *
 * Auth is handled via the standard OTel env var OTEL_EXPORTER_OTLP_HEADERS
 * (read automatically by the SDK - no manual header construction needed).
 * Requires OTEL_EXPORTER_OTLP_ENDPOINT + OTEL_EXPORTER_OTLP_HEADERS.
 * Without these, instrumentation still runs but nothing is exported.
 *
 * Note: sdkOptions is typed as Record<string, any> to avoid TS structural errors
 * caused by pnpm resolving multiple OTel package versions simultaneously for
 * different peer dependency trees. The code is correct at runtime.
 */
import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { config as dotenvConfig } from 'dotenv';

// Load .env.dev.local before reading process.env - tracing.ts runs before
// NestJS ConfigModule, so the file is not loaded yet at this point.
// override: false preserves real system env vars (staging, production).
dotenvConfig({ path: '../../.env.dev.local', override: false });

// In non-production, activate the official OTel diagnostic logger at INFO level.
// This logs every export attempt (success / failure / HTTP response) to the console.
// Set OTEL_LOG_LEVEL=debug env var for full verbose output.
if (process.env.NODE_ENV !== 'production') {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
}

const appEnv = process.env.APP_ENV ?? 'development';
const serviceName = process.env.OTEL_SERVICE_NAME ?? 'api-nestjs';
const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? '';
// OTEL_EXPORTER_OTLP_HEADERS is read automatically by all OTLP exporters
const hasCredentials = !!(
  otlpEndpoint && process.env.OTEL_EXPORTER_OTLP_HEADERS
);

// Typed loosely to avoid TS structural errors from conflicting OTel peer dep versions.

const sdkOptions: Record<string, any> = {
  resource: resourceFromAttributes({
    'service.name': serviceName,
    'deployment.environment': appEnv,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // fs instrumentation generates too much noise
      '@opentelemetry/instrumentation-fs': { enabled: false },
      // Explicitly enable HTTP metrics
      '@opentelemetry/instrumentation-http': {
        enabled: true,
      },
    }),
  ],
};

if (hasCredentials) {
  sdkOptions['traceExporter'] = new OTLPTraceExporter({
    url: `${otlpEndpoint}/v1/traces`,
  });

  sdkOptions['metricReader'] = new PeriodicExportingMetricReader({
    exportIntervalMillis: 60_000,

    exporter: new OTLPMetricExporter({
      url: `${otlpEndpoint}/v1/metrics`,
    }) as any,
  });

  sdkOptions['logRecordProcessor'] = new BatchLogRecordProcessor(
    new OTLPLogExporter({ url: `${otlpEndpoint}/v1/logs` }),
  );

  console.log('[OTel] Exporters configured');
  console.log(`[OTel]   service.name            = ${serviceName}`);
  console.log(`[OTel]   deployment.environment  = ${appEnv}`);
  console.log(`[OTel]   traces  -> ${otlpEndpoint}/v1/traces`);
  console.log(`[OTel]   metrics -> ${otlpEndpoint}/v1/metrics (every 60s)`);
  console.log(`[OTel]   logs    -> ${otlpEndpoint}/v1/logs`);
  console.log('[OTel]   export results logged via DiagConsoleLogger (INFO)');
} else {
  console.warn(
    '[OTel] Exporters NOT configured - telemetry collected but not exported.',
  );
  if (!otlpEndpoint) {
    console.warn('[OTel]   missing: OTEL_EXPORTER_OTLP_ENDPOINT');
  }
  if (!process.env.OTEL_EXPORTER_OTLP_HEADERS) {
    console.warn('[OTel]   missing: OTEL_EXPORTER_OTLP_HEADERS');
  }
}

const sdk = new NodeSDK(sdkOptions);

sdk.start();

async function flushAndShutdown(signal: string): Promise<void> {
  console.log(`[OTel] ${signal} received - flushing and shutting down...`);
  try {
    await sdk.shutdown();
    console.log('[OTel] Flush complete, SDK shut down cleanly.');
  } catch (err) {
    console.error('[OTel] Shutdown error:', err);
  }
  process.exit(0);
}

process.on('SIGTERM', () => void flushAndShutdown('SIGTERM'));
process.on('SIGINT', () => void flushAndShutdown('SIGINT'));
