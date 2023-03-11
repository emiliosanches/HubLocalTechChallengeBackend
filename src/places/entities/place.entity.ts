import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  zipcode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({
    name: 'company_id',
  })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.places)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: Company;
}
