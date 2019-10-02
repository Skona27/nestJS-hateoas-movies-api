import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IMovie } from './types';

@Entity()
export class Movie implements IMovie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  year: number;

  @Column()
  director: string;

  @Column()
  language: string;

  @Column()
  length: number;

  @Column()
  rate: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  modifiedAt: Date;
}
