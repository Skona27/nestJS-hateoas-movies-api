import { IMovie, ILink } from './types';

export interface ISingleMovieResponseDTO
  extends Omit<IMovie, 'createdAt' | 'modifiedAt'> {
  links: ILink[];
}

export interface IAllMoviesResponseDTO {
  totalCount: number;
  perPage: number;
  pageNumber: number;
  movies: ISingleMovieResponseDTO[];
  links: ILink[];
}

export type IMovieForCreationDTO = Omit<
  IMovie,
  'id' | 'createdAt' | 'modifiedAt'
>;

export type IMovieForResponseDTO = Omit<IMovie, 'createdAt' | 'modifiedAt'>;
export type IMovieForUpdateDTO = Partial<IMovieForCreationDTO>;
