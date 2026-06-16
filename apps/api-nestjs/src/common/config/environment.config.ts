import { registerAs } from '@nestjs/config';

export const environmentConfig = registerAs('environment', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL,
  forceSecretCombination: process.env.FORCE_SECRET_COMBINATION,
  appEnv: process.env.APP_ENV || 'development',
  otelServiceName: process.env.OTEL_SERVICE_NAME || 'api-nestjs',
  otelExporterOtlpEndpoint:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318',
}));

export interface EnvironmentConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  forceSecretCombination?: string;
  appEnv: string;
  otelServiceName: string;
  otelExporterOtlpEndpoint: string;
}
