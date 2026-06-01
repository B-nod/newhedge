import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestimonial1780352416000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`testimonial\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`message\` text NOT NULL,
        \`approved\` tinyint NOT NULL DEFAULT 0,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(
      `CREATE INDEX \`IDX_APPROVED\` ON \`testimonial\` (\`approved\`)`
    );

    await queryRunner.query(
      `CREATE INDEX \`IDX_CREATED_AT\` ON \`testimonial\` (\`createdAt\`)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`testimonial\``);
  }
}
