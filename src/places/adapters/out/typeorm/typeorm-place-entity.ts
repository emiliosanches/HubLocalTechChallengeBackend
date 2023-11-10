import { CompanyTypeorm } from 'src/companies/adapters/out/typeorm/typeorm-company-entity';
import { Place } from 'src/places/domain/place.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('places')
export class PlaceTypeorm {
  constructor(data?: Partial<Place>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.zipcode = data.zipcode;
      this.street = data.street;
      this.number = data.number;
      this.neighborhood = data.neighborhood;
      this.city = data.city;
      this.state = data.state;
      this.companyId = data.companyId;
      this.company = data.company;
    }
  }

  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => CompanyTypeorm, (company) => company.places)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: CompanyTypeorm;
}
