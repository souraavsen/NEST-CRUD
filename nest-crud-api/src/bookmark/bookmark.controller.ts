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

@Controller('bookmark')
export class BookmarkController {
  // GET Bookmarks from query params
  @Get()
  getBookmarksFromQuery(@Query('type') type: string | number) {
    console.log(type);

    if (type) {
      return [{ type }];
    } else {
      return 'Get All Bookmarks';
    }
  }

  // GET all Bookmarks
  @Get()
  getBookmarks() {
    return 'Get All Bookmarks';
  }

  // GET single Bookmarks
  @Get(':id')
  getSingleBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }

  // Create Bookmark
  @Post()
  createBookmarks(@Body() bookmarkDetails: CreateBookmarkDto) {
    return bookmarkDetails;
  }

  // update Bookmark
  @Put(':id')
  updateBookmarks(
    @Param('id') id: string | number,
    @Body() bookmarkDetails: UpdateBookmarkDto,
  ) {
    return { id: id, ...bookmarkDetails };
  }

  // Delte Bookmark
  @Delete(':id')
  deleteBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }
}
