import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// interface ExtendedSqliteConnectionOptions extends SqliteConnectionOptions {
//   cli: any;
// }

export const config: any = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/**{.ts,.js}'],
  cli: {
    migrationsdir: 'src/db/migrations',
  },
};
