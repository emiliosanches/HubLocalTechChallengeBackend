import { Module, forwardRef } from '@nestjs/common';
import { Services } from '.';
import { UserAdapterModule } from '../adapters/adapters.module';

@Module({
  imports: [forwardRef(() => UserAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class UserUseCasesModule {}
