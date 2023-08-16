import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmarks } from './entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmarks])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
