import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUUIDAnel1726161063729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
            ALTER TABLE "anel"
            ALTER COLUMN "id" DROP DEFAULT,
            ALTER COLUMN "id" TYPE uuid USING (uuid_generate_v4()),
            ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "anel"
            ALTER COLUMN "id" DROP DEFAULT,
            ALTER COLUMN "id" TYPE SERIAL,
            ALTER COLUMN "id" SET DEFAULT nextval('anel_id_seq');
        `);

    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
