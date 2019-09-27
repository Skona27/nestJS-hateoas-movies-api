import { Module } from '@nestjs/common';

import { MoviesController } from './controller';
import { MovieService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MoviesModule {}
