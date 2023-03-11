import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
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

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @OneToMany(() => Place, (place) => place.company)
  places: Place[];
}
