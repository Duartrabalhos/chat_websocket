import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chatuser',
  password: 'postgres',
  database: 'wschat',
  synchronize: false,
  logging: false,
  entities: ['src/domain/entities/**/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
