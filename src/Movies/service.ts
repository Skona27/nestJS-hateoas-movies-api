import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity';
import { IMovie } from './types';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(take: number, skip: number): Promise<IMovie[]> {
    const movies = await this.movieRepository.find({ take, skip });
    return movies;
  }

  async countAll(): Promise<number> {
    const [movies, count] = await this.movieRepository.findAndCount();
    return count;
  }

  async findAById(movieId: string): Promise<IMovie> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    return movie;
  }
}
