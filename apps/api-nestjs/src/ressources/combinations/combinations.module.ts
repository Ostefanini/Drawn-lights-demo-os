import { Module } from '@nestjs/common';
import { CombinationsController } from './combinations.controller.js';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationsService } from './combinations.service.js';
import { SecretCombinationsRepository } from './secret-combinations.repository.js';

@Module({
  controllers: [CombinationsController],
  providers: [
    CombinationsService,
    CombinationsRepository,
    SecretCombinationsRepository,
  ],
})
export class CombinationsModule {}
