import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];
}
