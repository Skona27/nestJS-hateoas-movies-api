import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface IConfig {
  database: TypeOrmModuleOptions;
}
