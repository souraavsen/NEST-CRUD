import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';
import { BookmarkService } from './bookmark.services';

@Controller('bookmark')
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
  getSingleBookmarks(@Param('id') id: string) {
    return this.bookmarkService.getBookmark(+id);
  }

  // Create Bookmark
  @Post()
  createBookmarks(@Body() bookmarkDetails: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(bookmarkDetails);
  }

  // update Bookmark
  @Put(':id')
  updateBookmarks(
    @Param('id') id: string,
    @Body() bookmarkDetails: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(+id, bookmarkDetails);
  }

  // Delte Bookmark
  @Delete(':id')
  deleteBookmarks(@Param('id') id: string) {
    return this.bookmarkService.deleteBookmark(+id);
  }
}
