import { Request } from 'express';
import { Like } from 'typeorm';

import { IMovie, IMovieLinkType, ILink } from './types';
import { sortableFields as sortableFieldsConst } from './constants';

export const getUrl = (request: Request) => `http://${request.headers.host}`;

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
  searchQuery: string,
  sortBy: string,
  order: 'ASC' | 'DESC',
  request: Request,
) => {
  const links = [];
  const url = getUrl(request);

  const doesPreviousLinkExist = offset > 0;
  const doesNextLinkExist = totalCount > perPage + offset;
  const doesSearchQueryExist = searchQuery.length > 0;
  const doesSortConditionExist =
    Object.keys(getSortCondition(sortableFieldsConst)(sortBy, order)).length >
    0;

  if (doesPreviousLinkExist) {
    links.push(mapPreviousPageLink(perPage, offset, url));
  }

  if (doesNextLinkExist) {
    links.push(mapNextPageLink(perPage, offset, url));
  }

  if (doesSearchQueryExist) {
    const appendSearchQuery = appendSearchQueryToLink(searchQuery);
    links.forEach(appendSearchQuery);
  }

  if (doesSortConditionExist) {
    const appendSortCondition = appendSortConditionToLink(sortBy, order);
    links.forEach(appendSortCondition);
  }

  return links;
};

export const getSearchConditions = (searchableFields: string[]) => (
  query: string,
) => searchableFields.map(field => ({ [field]: Like(`%${query}%`) }));

export const getSortCondition = (sortableFields: string[]) => (
  field: string,
  order: 'ASC' | 'DESC',
) => {
  return sortableFields.includes(field) ? { [field]: order } : {};
};

export const getSortOrder = (order: string | null) =>
  order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

const appendSearchQueryToLink = (searchQuery: string) => (link: ILink) => {
  link.href += `&search=${searchQuery}`;
};

const appendSortConditionToLink = (sortBy: string, order: string) => (
  link: ILink,
) => {
  link.href += `&sortBy=${sortBy}&order=${order}`;
};
