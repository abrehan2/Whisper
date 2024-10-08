// Imports:
import { RegisterUser, LoginUser } from '../../controllers/user';

export const graphResolvers = {
  Query: {},
  Mutation: {
    Register: RegisterUser,
    Login: LoginUser,
  },
};
