import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<any> {
    const movies = await this.movieRepository.find();
    return movies;
  }

  async findAById(movieId: string): Promise<any> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    return movie;
  }
}
