import {
  combinationAttributionBodySchema,
  type CombinationAttributionBody,
} from '@drawn-lights-demo/shared';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe.js';
import { CombinationsService } from './combinations.service.js';
import { querySchema, type CombinationQuery } from './combinations.type.js';

@ApiTags('combinations')
@Controller('combinations')
export class CombinationsController {
  constructor(private readonly combinationsService: CombinationsService) {}

  @Get('/secret-status')
  @ApiOperation({ summary: 'Get the status of the secret combination' })
  @ApiResponse({
    status: 200,
    description: 'Secret combination status',
    schema: {
      type: 'object',
      properties: {
        found: { type: 'boolean' },
        foundBy: { type: 'string', nullable: true },
        combination: {
          nullable: true,
          type: 'object',
          properties: {
            assetOne: { type: 'string' },
            assetTwo: { type: 'string', nullable: true },
            assetThree: { type: 'string', nullable: true },
            assetFour: { type: 'string', nullable: true },
            sound: { type: 'string' },
          },
        },
      },
    },
  })
  async getSecretStatus() {
    return await this.combinationsService.getSecretStatus();
  }

  @Get('/is-found')
  @ApiOperation({ summary: 'Check if a combination has been found' })
  @ApiQuery({ name: 'assetOne', required: true, description: 'First asset' })
  @ApiQuery({
    name: 'assetTwo',
    required: false,
    description: 'Second asset',
  })
  @ApiQuery({
    name: 'assetThree',
    required: false,
    description: 'Third asset',
  })
  @ApiQuery({
    name: 'assetFour',
    required: false,
    description: 'Fourth asset',
  })
  @ApiQuery({
    name: 'sound',
    required: true,
    enum: ['healing', 'emerveille', 'glossy', 'none'],
    description: 'Sound type',
  })
  @ApiResponse({
    status: 200,
    description: 'Combination status',
    schema: {
      type: 'object',
      properties: {
        exist: { type: 'boolean' },
        foundBy: { type: 'string', nullable: true },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  async isCombinationFound(
    @Query(new ZodValidationPipe(querySchema)) params: CombinationQuery,
  ) {
    return await this.combinationsService.isCombinationFound(params);
  }

  @Post('/attribute')
  @ApiOperation({ summary: 'Assign a combination to a user' })
  @ApiQuery({ name: 'assetOne', required: true })
  @ApiQuery({ name: 'assetTwo', required: false })
  @ApiQuery({ name: 'assetThree', required: false })
  @ApiQuery({ name: 'assetFour', required: false })
  @ApiQuery({
    name: 'sound',
    required: true,
    enum: ['healing', 'emerveille', 'glossy', 'none'],
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userNickname: { type: 'string', minLength: 3, maxLength: 20 },
      },
      required: ['userNickname'],
    },
  })
  @ApiResponse({ status: 201, description: 'Combination created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Combination already exists or invalid data',
  })
  async attributeCombination(
    @Query(new ZodValidationPipe(querySchema))
    params: CombinationQuery,
    @Body(new ZodValidationPipe(combinationAttributionBodySchema))
    body: CombinationAttributionBody,
  ) {
    return await this.combinationsService.attributeCombination(
      params,
      body.userNickname,
    );
  }
}
