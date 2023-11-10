import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/users-use-cases.module';
import { UserAdapterModule } from './adapters/adapters.module';

@Module({
  imports: [UserUseCasesModule, UserAdapterModule],
})
export class UsersModule {}
