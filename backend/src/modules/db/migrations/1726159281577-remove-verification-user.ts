import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveVerificationUser1726159281577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "user"
          DROP COLUMN "is_verified",
          DROP COLUMN "verification_code",
          DROP COLUMN "verification_code_expires";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "user"
          ADD COLUMN "is_verified" boolean NOT NULL DEFAULT false,
          ADD COLUMN "verification_code" varchar(256) NOT NULL,
          ADD COLUMN "verification_code_expires" timestamp NOT NULL;
        `);
  }
}
