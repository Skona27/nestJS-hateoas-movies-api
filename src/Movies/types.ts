export interface IMovie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  director: string;
  language: string;
  length: number;
  rate: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type IMovieLinkType = 'self' | 'update' | 'delete';
export type IPageLinkType = 'next' | 'prev';

export interface ILink {
  rel: IMovieLinkType | IPageLinkType;
  method: string;
  href: string;
}
