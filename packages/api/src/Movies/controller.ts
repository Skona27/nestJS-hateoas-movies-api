import { Controller, Get, Param, Req, Query } from '@nestjs/common';
import { Request } from 'express';

import { MovieService } from './service';
import {
  mapMovieLinksByType,
  mapMovieForResponse,
  mapPageLinks,
} from './helpers';
import { IMovieLinkType } from './types';
import { ISingleMovieResponseDTO, IAllMoviesResponse } from './dto';

const isUserLoggedIn = false;

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(
    @Req() request: Request,
    @Query('perPage') perPage: string,
    @Query('offset') offset: string,
  ): Promise<IAllMoviesResponse> {
    const skipCount = parseInt(offset, 10) || 0;
    const takeCount = parseInt(perPage, 10) || 3;
    const pageNumber = (takeCount + skipCount) / takeCount;

    const [totalCount, movies] = await Promise.all([
      await this.movieService.countAll(),
      await this.movieService.findAll(takeCount, skipCount),
    ]);

    const mapMovieLinks = mapMovieLinksByType(['self'], request);

    const moviesData = movies.map(movie => ({
      ...mapMovieForResponse(movie),
      links: mapMovieLinks(movie),
    }));

    const pageLinks = mapPageLinks(totalCount, takeCount, skipCount, request);

    const response = {
      totalCount,
      perPage: takeCount,
      pageNumber,
      movies: moviesData,
      links: pageLinks,
    };

    return response;
  }

  @Get(':id')
  async findById(
    @Req() request: Request,
    @Param('id') id,
  ): Promise<ISingleMovieResponseDTO> {
    const movie = await this.movieService.findAById(id);

    const linkTypes: IMovieLinkType[] = isUserLoggedIn
      ? ['update', 'delete']
      : [];

    const mapMovieLinks = mapMovieLinksByType(linkTypes, request);

    return { ...mapMovieForResponse(movie), links: mapMovieLinks(movie) };
  }
}
