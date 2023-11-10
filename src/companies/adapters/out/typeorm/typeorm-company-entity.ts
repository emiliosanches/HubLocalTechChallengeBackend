import { Company } from 'src/companies/domain/company.entity';
import { PlaceTypeorm } from 'src/places/adapters/out/typeorm/typeorm-place-entity';
import { UserTypeorm } from 'src/users/adapters/out/typeorm/typeorm-user-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('companies')
export class CompanyTypeorm {
  constructor(data?: Partial<Company>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.cnpj = data.cnpj;
      this.website = data.website;
      this.userId = data.userId;
      this.user = data.user;
      this.places = data.places;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  website: string;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => UserTypeorm, (user) => user.companies)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserTypeorm;

  @OneToMany(() => PlaceTypeorm, (place) => place.company)
  places: PlaceTypeorm[];
}
