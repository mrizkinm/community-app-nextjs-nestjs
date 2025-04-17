import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres', // Tipe database, untuk PostgreSQL
  host: process.env.DATABASE_HOST, // Alamat host, bisa menggunakan IP atau nama domain
  port: Number(process.env.DATABASE_PORT), // Port default PostgreSQL
  username: process.env.DATABASE_USERNAME, // Username database
  password: process.env.DATABASE_PASSWORD, // Password database
  database: process.env.DATABASE_NAME, // Nama database yang digunakan
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'], // Tempat migrasi kamu
  synchronize: false,
  logging: true,
});
