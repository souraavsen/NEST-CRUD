import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('bookmark')
export class BookmarkController {
  // GET all Bookmarks
  @Get()
  getBookmarks() {
    return 'Get All Bookmarks';
  }

  // GET single Bookmarks
  @Get(':id')
  getSingleookmarks(@Param('id') id: string | number) {
    return { id: id };
  }

  @Post()
  createBookmarks() {
    return 'Add Bookmark';
  }

  @Put(':id')
  updateBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }

  @Delete(':id')
  deleteBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }
}
