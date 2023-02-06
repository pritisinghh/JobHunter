import { Test, TestingModule } from '@nestjs/testing';
import { ResumeMakerController } from './resume_maker.controller';

describe('ResumeMakerController', () => {
  let controller: ResumeMakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeMakerController],
    }).compile();

    controller = module.get<ResumeMakerController>(ResumeMakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
