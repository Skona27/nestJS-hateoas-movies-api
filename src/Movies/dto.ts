import { IMovie, ILink } from './types';

export interface ISingleMovieResponseDTO
  extends Omit<IMovie, 'createdAt' | 'modifiedAt'> {
  links: ILink[];
}

export interface IAllMoviesResponse {
  totalCount: number;
  perPage: number;
  pageNumber: number;
  movies: ISingleMovieResponseDTO[];
  links: ILink[];
}
