// OpenTelemetry MUST be initialized before any other imports so that
// instrumentation patches are applied before application modules load.
import './tracing.js';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import packageJson from '../package.json' with { type: 'json' };
import { AppModule } from './app.module.js';
import { EnvironmentConfig } from './common/config/environment.config.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Use nestjs-pino logger only if OTEL is enabled, otherwise use default NestJS logger
  if (process.env.OTEL_ENABLED === 'true') {
    app.useLogger(app.get(Logger));
  }

  // Exception filter global
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(`${packageJson.name} API`)
    .setDescription('Open source Drawn Lights demo API')
    .setVersion('1.0')
    .addTag('combinations', 'Drone show combinations management')
    .addTag('assets', 'Assets management - not editable in production')
    .addTag('users', 'Users management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<EnvironmentConfig['port']>('environment.port');
  await app.listen(port!);
}
void bootstrap();
