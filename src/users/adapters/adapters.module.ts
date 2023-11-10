import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './in/rest/users-controller';
import { UserUseCasesModule } from '../use-cases/users-use-cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './out/typeorm/typeorm-user-entity';
import { ServicesOut } from './out';

@Module({
  imports: [
    forwardRef(() => UserUseCasesModule),
    TypeOrmModule.forFeature([UserTypeorm]),
  ],
  controllers: [UsersController],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
})
export class UserAdapterModule {}
