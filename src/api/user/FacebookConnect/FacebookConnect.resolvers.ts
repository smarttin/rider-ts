import { FacebookConnectMutationArgs, FacebookConnectResponse } from 'src/types/graph';
import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import createJwt from '../../../util/createJwt';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
      const {fbId} = args;
      try {
        const existingUser = await User.findOne({fbId});
        if (existingUser) {
          const token = createJwt(existingUser.id);
          return {
            ok: false,
            error: null,
            token,
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        const token = createJwt(newUser.id);
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers;
