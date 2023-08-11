import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { BookmarkService } from './bookmark.services';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';
import { AuthenticatedGuard } from 'src/authenticated/authenticated.guard';

@Controller('bookmark')
@UseGuards(AuthenticatedGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // GET Bookmarks from query params
  @Get()
  getBookmarksFromQuery(@Query('category') category: string) {
    // const service = new BookmarkService();
    return this.bookmarkService.getBookmarks(category);
  }

  // GET all Bookmarks
  @Get()
  getBookmarks() {
    return 'Get All Bookmarks';
  }

  // GET single Bookmarks
  @Get(':id')
  getSingleBookmarks(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.getBookmark(id);
  }

  // Create Bookmark
  @Post()
  createBookmarks(
    @Body(new ValidationPipe()) bookmarkDetails: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(bookmarkDetails);
  }

  // update Bookmark
  @Put(':id')
  updateBookmarks(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) bookmarkDetails: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(id, bookmarkDetails);
  }

  // Delete Bookmark
  @Delete(':id')
  deleteBookmarks(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.deleteBookmark(id);
  }
}
