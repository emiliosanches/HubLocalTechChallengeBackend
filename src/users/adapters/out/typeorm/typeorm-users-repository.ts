import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/use-cases/ports/user-repository';
import { UserTypeorm } from './typeorm-user-entity';
import { Repository } from 'typeorm';

export class TypeormUsersRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly userRepository: Repository<UserTypeorm>,
  ) {}

  async exists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return !!user;
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
