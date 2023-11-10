import { User as AppUser } from 'src/users/domain/user.entity';

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
