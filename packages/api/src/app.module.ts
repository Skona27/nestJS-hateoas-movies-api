import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';
import { config } from './config';
import { MoviesModule } from './Movies/module';

@Module({
  imports: [TypeOrmModule.forRoot(config.database), MoviesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
