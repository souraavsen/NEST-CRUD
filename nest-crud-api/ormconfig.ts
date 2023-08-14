import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'nest-api-example',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
};
