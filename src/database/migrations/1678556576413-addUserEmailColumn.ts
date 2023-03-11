import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUserEmailColumn1678556576413 implements MigrationInterface {
  private tableName = 'users';
  private columnName = 'email';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.columnName);
  }
}
