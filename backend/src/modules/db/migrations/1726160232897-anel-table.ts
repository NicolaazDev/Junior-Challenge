import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnelTable1726160232897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "anel" (
                "id" SERIAL NOT NULL, 
                "nome" character varying NOT NULL, 
                "poder" character varying NOT NULL, 
                "portador" character varying NOT NULL, 
                "forjadoPor" character varying NOT NULL, 
                "imagem" character varying NOT NULL, 
                CONSTRAINT "PK_97d67c484e8938b1c7e5c6caa5d" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "anel"`);
  }
}
