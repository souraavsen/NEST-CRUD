import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bookmarks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  category: string;
}
