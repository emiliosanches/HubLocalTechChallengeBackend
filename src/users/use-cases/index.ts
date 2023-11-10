import { Provider } from '@nestjs/common';
import { CREATE_USER_USE_CASE } from './create-user-use-case/create-user.contract';
import { CreateUserUseCase } from './create-user-use-case/create-user.implementation';

export const Services: Provider[] = [
  { provide: CREATE_USER_USE_CASE, useClass: CreateUserUseCase },
];
