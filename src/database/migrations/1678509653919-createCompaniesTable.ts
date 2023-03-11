import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCompaniesTable1678509653919 implements MigrationInterface {
  private tableName = 'companies';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'cnpj', type: 'varchar(14)', isNullable: false },
          { name: 'website', type: 'varchar', isNullable: false },
          { name: 'user_id', type: 'integer', isNullable: false },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
