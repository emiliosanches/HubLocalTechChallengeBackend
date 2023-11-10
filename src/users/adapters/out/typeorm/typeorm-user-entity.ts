import { CompanyTypeorm } from 'src/companies/adapters/out/typeorm/typeorm-company-entity';
import { User } from 'src/users/domain/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserTypeorm {
  constructor(data?: Partial<User>) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.name = data.name;
      this.password = data.password;
      this.companies = data.companies;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CompanyTypeorm, (company) => company.user)
  companies: CompanyTypeorm[];
}
