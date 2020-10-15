import {EmailSignInMutationArgs, EmailSignInResponse} from 'src/types/graph';
import {Resolvers} from 'src/types/resolvers';
import User from '../../../entities/User';
import createJwt from '../../../util/createJwt';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      const {email} = args;
      try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
          return {
            ok: false,
            error: 'You should log in instead',
            token: null,
          };
        } else {
          const newUser = await User.create({...args}).save();
          const token = createJwt(newUser.id);
          return {
            ok: true,
            error: null,
            token,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
