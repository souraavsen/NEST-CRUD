import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from '../database/ormconfig';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    AuthModule,
    BookmarkModule,
  ],
})
export class AppModule {}
