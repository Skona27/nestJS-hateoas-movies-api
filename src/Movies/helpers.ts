import { Request } from 'express';

import { IMovie, IMovieLinkType, ILink, IPageLinkType } from './types';

export const getUrl = (request: Request) => `http://${request.headers.host}`;

export const mapMovieForResponse = ({
  createdAt,
  modifiedAt,
  ...movie
}: IMovie): Omit<IMovie, 'createdAt' | 'modifiedAt'> => ({ ...movie });

export const mapMovieLinksByType = (
  types: IMovieLinkType[],
  request: Request,
) => (movie: IMovie): ILink[] => {
  const url = getUrl(request);
  const mapLinks = mapSingleMovieLink(movie, url);

  return types.map(mapLinks);
};

export const mapSelfLink = (movie: IMovie, url: string): ILink => ({
  rel: 'self',
  method: 'GET',
  href: `${url}/movies/${movie.id}`,
});

export const mapUpdateLink = (movie: IMovie, url: string): ILink => ({
  rel: 'update',
  method: 'PUT',
  href: `${url}/movies/${movie.id}`,
});

export const mapDeleteLink = (movie: IMovie, url: string): ILink => ({
  rel: 'delete',
  method: 'DELETE',
  href: `${url}/movies/${movie.id}`,
});

export const mapSingleMovieLink = (movie: IMovie, url: string) => (
  type: IMovieLinkType,
): ILink => {
  switch (type) {
    case 'self':
      return mapSelfLink(movie, url);
    case 'update':
      return mapUpdateLink(movie, url);
    case 'delete':
      return mapDeleteLink(movie, url);

    default:
      return null;
  }
};

export const mapNextPageLink = (
  perPage: number,
  offset: number,
  url: string,
): ILink => ({
  rel: 'next',
  method: 'GET',
  href: `${url}/movies?perPage=${perPage}&offset=${offset + perPage}`,
});

export const mapPreviousPageLink = (
  perPage: number,
  offset: number,
  url: string,
): ILink => ({
  rel: 'prev',
  method: 'GET',
  href: `${url}/movies?perPage=${perPage}&offset=${offset - perPage}`,
});

export const mapPageLinks = (
  totalCount: number,
  perPage: number,
  offset: number,
  request: Request,
) => {
  const links = [];
  const url = getUrl(request);

  const doesPreviousLinkExist = offset > 0;
  const doesNextLinkExist = totalCount > perPage + offset;

  if (doesPreviousLinkExist) {
    links.push(mapPreviousPageLink(perPage, offset, url));
  }

  if (doesNextLinkExist) {
    links.push(mapNextPageLink(perPage, offset, url));
  }

  return links;
};
