import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id): Promise<any> {
    return this.movieService.findAById(id);
  }
}
