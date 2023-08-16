import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'sqlite',
  database: `${process.env.DB_NAME}`,
  entities: ['dist/src/**/*.entity{.js,.ts}'],
  synchronize: false,
  migrations: ['dist/database/migrations/**{.js,.ts}'],
};

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
