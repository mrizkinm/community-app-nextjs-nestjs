import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { LikesModule } from './likes/likes.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env secara otomatis
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipe database, untuk PostgreSQL
      host: process.env.DATABASE_HOST, // Alamat host, bisa menggunakan IP atau nama domain
      port: Number(process.env.DATABASE_PORT), // Port default PostgreSQL
      username: process.env.DATABASE_USERNAME, // Username database
      password: process.env.DATABASE_PASSWORD, // Password database
      database: process.env.DATABASE_NAME, // Nama database yang digunakan
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Jangan pakai di produksi! Ini akan membuat TypeORM otomatis membuat dan mengubah tabel sesuai dengan entitas
      migrationsRun: false,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}']
    }),
    AuthModule, AdminModule, PostsModule, CommentsModule, TagsModule, LikesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
