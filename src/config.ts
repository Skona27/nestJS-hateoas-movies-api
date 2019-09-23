import * as dotenv from 'dotenv';
import { IConfig } from './types';

dotenv.config();

export const config: IConfig = {
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: ['src/**/entities/*{.ts,.js}'],
    synchronize: true,
    logging: true,
  },
};
