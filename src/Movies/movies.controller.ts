import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  allMovies() {
    return { message: 'Hello world!' };
  }
}
