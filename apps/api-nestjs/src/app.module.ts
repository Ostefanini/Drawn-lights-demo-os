import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { trace } from '@opentelemetry/api';
import { randomUUID } from 'crypto';
import { IncomingMessage } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { environmentConfig } from './common/config/environment.config.js';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AssetsModule } from './ressources/assets/assets.module.js';
import { CombinationsModule } from './ressources/combinations/combinations.module.js';
import { UsersModule } from './ressources/users/users.module.js';
import { VideoModule } from './ressources/video/video.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfig],
      ignoreEnvFile:
        process.env.NODE_ENV === 'test' ||
        process.env.NODE_ENV === 'production',
      envFilePath: '../../.env.dev.local',
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('environment.nodeEnv');
        const appEnv = configService.get<string>('environment.appEnv');
        const isProduction = nodeEnv === 'production';
        const isTest = nodeEnv === 'test';
        return {
          pinoHttp: {
            level: isTest ? 'silent' : isProduction ? 'info' : 'info',
            // Static fields added to every log line
            base: { env: appEnv, pid: process.pid },
            // Inject active OTel trace context into each log line
            mixin() {
              const span = trace.getActiveSpan();
              if (!span?.isRecording()) return {};
              const ctx = span.spanContext();
              return { trace_id: ctx.traceId, span_id: ctx.spanId };
            },
            // Reuse the request ID set by RequestIdMiddleware
            genReqId: (req: IncomingMessage) =>
              (req.headers['x-request-id'] as string | undefined) ??
              randomUUID(),
            // Pretty-print in development for terminal readability
            // OTel auto-instrumentation captures logs BEFORE the transport,
            // so it still receives valid JSON even though stdout shows pretty format
            transport:
              nodeEnv === 'development'
                ? {
                    target: 'pino-pretty',
                    options: { colorize: true, singleLine: true },
                  }
                : undefined,
          },
        };
      },
    }),
    PrismaModule,
    AssetsModule,
    CombinationsModule,
    UsersModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
