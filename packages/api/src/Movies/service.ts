import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { Movie } from './entity';
import { IMovie } from './types';
import { getSearchConditions, getSortCondition } from './helpers';
import {
  searchableFields,
  sortableFields,
  movieFieldsToSelect,
} from './constants';
import {
  IMovieForCreationDTO,
  IMovieForResponseDTO,
  IMovieForUpdateDTO,
} from './dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(
    take: number,
    skip: number,
    searchQuery: string,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ): Promise<[IMovie[], number]> {
    const searchConditions = getSearchConditions(searchableFields);
    const sortCondition = getSortCondition(sortableFields);

    const [movies, count] = await this.movieRepository.findAndCount({
      take,
      skip,
      where: searchConditions(searchQuery),
      order: sortCondition(sortBy, order),
      select: movieFieldsToSelect,
    } as FindConditions<Movie>);
    return [movies, count];
  }

  async findAById(movieId: string): Promise<IMovie> {
    const movies = await this.movieRepository.find({
      take: 1,
      where: { id: movieId },
      select: movieFieldsToSelect,
    } as FindConditions<Movie>);
    return movies[0];
  }

  async create(
    movieForCreation: IMovieForCreationDTO,
  ): Promise<IMovieForResponseDTO> {
    const movie = await this.movieRepository.insert(movieForCreation);
    return { ...movieForCreation, id: movie.identifiers[0].id };
  }

  async deleteById(id: string) {
    await this.movieRepository.delete({ id });
  }

  async updateById(id: string, movieForUpdate: IMovieForUpdateDTO) {
    const modifiedAt = new Date().toDateString();
    await this.movieRepository.update(
      { id },
      { ...movieForUpdate, id, modifiedAt },
    );
  }
}
