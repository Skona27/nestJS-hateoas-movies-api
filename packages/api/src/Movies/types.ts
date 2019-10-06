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
  createdAt: string;
  modifiedAt: string;
}

export interface ILink {
  rel: IMovieLinkType | IPageLinkType;
  method: string;
  href: string;
}

export type IMovieLinkType = 'self' | 'update' | 'delete';
export type IPageLinkType = 'next' | 'prev';
