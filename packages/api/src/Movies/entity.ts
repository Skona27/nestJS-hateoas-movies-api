import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IMovie } from './types';

@Entity()
export class Movie implements IMovie {
  @PrimaryGeneratedColumn()
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  modifiedAt: string;
}
