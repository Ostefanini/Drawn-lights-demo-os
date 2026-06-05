import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from '../../common/config/environment.config.js';

@Injectable()
export class ProductionAssetsGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(): boolean {
    const nodeEnv = this.configService.get<EnvironmentConfig['nodeEnv']>(
      'environment.nodeEnv',
    );
    return nodeEnv !== 'production';
  }
}
