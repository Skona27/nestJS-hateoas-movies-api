import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './entity';
import { IMovie } from './types';
import { getSearchConditions, getSortCondition } from './helpers';
import { searchableFields, sortableFields } from './constants';

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
      select: [
        'id',
        'title',
        'description',
        'genre',
        'year',
        'director',
        'language',
        'length',
        'rate',
      ],
      take,
      skip,
      where: searchConditions(searchQuery),
      order: sortCondition(sortBy, order),
    });
    return [movies, count];
  }

  async findAById(movieId: string): Promise<IMovie> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    return movie;
  }
}
