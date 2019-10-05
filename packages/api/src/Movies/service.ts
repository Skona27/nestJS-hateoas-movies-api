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
      select: movieFieldsToSelect,
      take,
      skip,
      where: searchConditions(searchQuery),
      order: sortCondition(sortBy, order),
    } as FindConditions<Movie>);
    return [movies, count];
  }

  async findAById(movieId: string): Promise<IMovie> {
    const movie = await this.movieRepository.findOne({
      id: movieId,
      select: movieFieldsToSelect,
    } as FindConditions<Movie>);
    return movie;
  }
}
