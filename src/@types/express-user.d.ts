import { User as AppUser } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
