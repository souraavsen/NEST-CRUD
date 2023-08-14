import { MinLength } from 'class-validator';
export class CreateBookmarkDto {
   id?: number;
   title: string;
   url: string;

  @MinLength(3)
  category: string;
}
