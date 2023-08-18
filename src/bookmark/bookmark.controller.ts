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
import { ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authenticated/authenticated.guard';
import { BookmarkService } from './bookmark.services';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';

@ApiTags('Bookmarks')
@Controller('api/bookmarks')
@UseGuards(AuthenticatedGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // GET Bookmarks from query params
  @Get()
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'category', required: false })
  /**
   * Retrieves bookmarks based on the provided query parameter `category`.
   *
   * @param category The category of the bookmarks to retrieve.
   * @returns An array of bookmarks that match the provided `category`.
   */
  /**
   * Retrieves bookmarks based on the provided query parameter `category`.
   *
   * @param category - The category of the bookmarks to retrieve.
   * @returns An array of bookmarks that match the provided `category`.
   */
  async getBookmarksFromQuery(@Query('category') category: string) {
    return await this.bookmarkService.findAll(category);
  }

  // GET all Categories
  /**
   * Retrieves all categories of bookmarks.
   *
   * @returns An array of categories representing different categories of bookmarks.
   * @throws {NotFoundException} If no categories are found.
   */
  @Get('categories')
  @ApiNotFoundResponse()
  getCategories() {
    return this.bookmarkService.findAllCategories();
  }

  /**
   * Retrieves a single bookmark based on the provided id.
   *
   * @param id - The id of the bookmark to retrieve.
   * @returns The bookmark with the specified id.
   */
  @Get(':id')
  @ApiNotFoundResponse()
  getSingleBookmarks(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.findOne(id);
    // return this.bookmarkService.getBookmark(id);
  }

  /**
   * Creates a new bookmark.
   * 
   * @param bookmarkDetails - An object containing the details of the bookmark to be created.
   *                          It should have the properties `title`, `url`, and `category`.
   * @returns The created bookmark object.
   */
  @Post()
  createBookmarks(
    @Body(new ValidationPipe()) bookmarkDetails: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(bookmarkDetails);
    // return this.bookmarkService.createBookmark(bookmarkDetails);
  }

  /**
   * Updates a bookmark with the provided id.
   * 
   * @param id - The id of the bookmark to be updated.
   * @param bookmarkDetails - An object containing the updated details of the bookmark.
   *                          It should have the properties `title`, `url`, and `category`.
   * @returns The updated bookmark object.
   */
  @Put(':id')
  @ApiNotFoundResponse()
  updateBookmarks(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) bookmarkDetails: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateOne(id, bookmarkDetails);
    // return this.bookmarkService.updateBookmark(id, bookmarkDetails);
  }

  /**
     * Deletes a bookmark with the specified id.
     * 
     * @param id - The id of the bookmark to be deleted.
     * @returns The deleted bookmark object.
     */
    @Delete(':id')
    @ApiNotFoundResponse()
    deleteBookmarks(@Param('id', ParseIntPipe) id: number) {
      try {
        return this.bookmarkService.removeOne(id);
      } catch (error) {
        throw new Error('Failed to delete bookmark');
      }
    }
}
