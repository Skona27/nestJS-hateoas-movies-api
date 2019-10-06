import {
  Controller,
  Get,
  Param,
  Req,
  Query,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Request } from 'express';

import { MovieService } from './service';
import { IMovieLinkType } from './types';
import { mapMovieLinksByType, mapPageLinks, getSortOrder } from './helpers';
import {
  ISingleMovieResponseDTO,
  IAllMoviesResponseDTO,
  IMovieForCreationDTO,
  IMovieForUpdateDTO,
} from './dto';

const isUserLoggedIn = false;

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(
    @Req() request: Request,
    @Query('perPage') perPage: string,
    @Query('offset') offset: string,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: string,
  ): Promise<IAllMoviesResponseDTO> {
    const skipCount = parseInt(offset, 10) || 0;
    const takeCount = parseInt(perPage, 10) || 3;
    const pageNumber = (takeCount + skipCount) / takeCount;

    const searchQuery = search || '';
    const sortOrder = getSortOrder(order);

    const [movies, totalCount] = await this.movieService.findAll(
      takeCount,
      skipCount,
      searchQuery,
      sortBy,
      sortOrder,
    );

    const mapMovieLinks = mapMovieLinksByType(['self'], request);

    const moviesData = movies.map(movie => ({
      ...movie,
      links: mapMovieLinks(movie),
    }));

    const pageLinks = mapPageLinks(
      totalCount,
      takeCount,
      skipCount,
      searchQuery,
      sortBy,
      sortOrder,
      request,
    );

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
    return { ...movie, links: mapMovieLinks(movie) };
  }

  @Post('')
  async create(
    @Req() request: Request,
    @Body() movieForCreation: IMovieForCreationDTO,
  ) {
    const movie = await this.movieService.create(movieForCreation);

    const linkTypes: IMovieLinkType[] = isUserLoggedIn
      ? ['update', 'delete']
      : [];

    const mapMovieLinks = mapMovieLinksByType(linkTypes, request);
    return { ...movie, links: mapMovieLinks(movie) };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.movieService.deleteById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() movieForUpdate: IMovieForUpdateDTO,
  ) {
    await this.movieService.updateById(id, movieForUpdate);
  }
}
