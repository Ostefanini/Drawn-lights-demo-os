import { registerAs } from '@nestjs/config';

export const environmentConfig = registerAs('environment', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL,
  forceSecretCombination: process.env.FORCE_SECRET_COMBINATION,
}));

export interface EnvironmentConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  forceSecretCombination?: string;
}
