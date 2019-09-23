import { Module } from '@nestjs/common';

import { MoviesController } from './movies.controller';

@Module({
  imports: [],
  controllers: [MoviesController],
})
export class MoviesModule {}
