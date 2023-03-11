import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPlacesTable1678510014696 implements MigrationInterface {
  private tableName = 'places';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'zipcode', type: 'varchar(9)', isNullable: false },
          { name: 'street', type: 'varchar', isNullable: false },
          { name: 'number', type: 'varchar', isNullable: false },
          { name: 'neighborhood', type: 'varchar', isNullable: false },
          { name: 'city', type: 'varchar', isNullable: false },
          { name: 'state', type: 'varchar', isNullable: false },
          { name: 'company_id', type: 'integer', isNullable: false },
        ],
        foreignKeys: [
          {
            columnNames: ['company_id'],
            referencedTableName: 'companies',
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
