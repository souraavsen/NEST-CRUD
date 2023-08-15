import { MigrationInterface, QueryRunner } from "typeorm";

export class BookmarkMigration1692103544956 implements MigrationInterface {
    name = 'BookmarkMigration1692103544956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "bookmarks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "url" varchar NOT NULL, "category" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bookmarks"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
