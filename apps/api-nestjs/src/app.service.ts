import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  pong(): string {
    return 'pong';
  }

  triggerError(): void {
    this.logger.error('Intentional error triggered via GET /error-test');
    throw new InternalServerErrorException('Intentional test error');
  }
}
