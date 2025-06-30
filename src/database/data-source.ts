import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chatuser',
  password: '12345678',
  database: 'wschat',
  synchronize: false,
  logging: false,
  entities: ['src/domain/entities/**/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
