import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';

@Injectable({})
export class BookmarkService {
  getBookmarks(category: string) {
    if (category) {
      return bookmarks.filter((site) => site.category === category);
    } else {
      return bookmarks;
    }
  }

  getBookmark(id: number) {
    const bookmark = bookmarks.find((obj) => obj.id === (id as any));

    if (bookmark) {
      return bookmark;
    } else {
      throw new Error('Bookmark Not Found');
    }
  }

  createBookmark(details: CreateBookmarkDto) {
    bookmarks.push({ id: bookmarks.length + 1, ...details });
    return this.getBookmarks('');
  }

  updateBookmark(id: number, updatedDetails: UpdateBookmarkDto) {
    const updates = bookmarks.map((bookmark) => {
      if (bookmark.id === (id as any)) {
        return { ...bookmark, ...updatedDetails };
      }
      return bookmark;
    });

    return updates.find((item) => item.id === (id as any));
    // return this.getBookmark(id);
  }

  deleteBookmark(id: number) {
    return bookmarks.filter((site) => site.id !== (id as any));
  }
}

// Data
const bookmarks: CreateBookmarkDto[] = [
  {
    id: 1,
    title: 'Google',
    url: 'https://www.google.com',
    category: 'Search Engine',
  },
  {
    id: 2,
    title: 'GitHub',
    url: 'https://github.com',
    category: 'Version Control',
  },
  {
    id: 3,
    title: 'NestJS',
    url: 'https://nestjs.com',
    category: 'Web Framework',
  },
  {
    id: 4,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    category: 'Programming Community',
  },
  {
    id: 5,
    title: 'NextJS',
    url: 'https://nextjs.dev',
    category: 'Web Framework',
  },
  {
    id: 6,
    title: 'ReatJS',
    url: 'https://reactjs.dev',
    category: 'Web Framework',
  },
];
