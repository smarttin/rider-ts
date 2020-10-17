import User from '../../../entities/User';
import {ReportMovementMutationArgs, ReportMovementResponse} from '../../../types/graph';
import {Resolvers} from '../../../types/resolvers';
import cleanNullArgs from '../../../util/cleanNullArg';
import privateResolver from '../../../util/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (_, args: ReportMovementMutationArgs, {req, pubSub}): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        try {
          await User.update({id: user.id}, {...notNull});
          pubSub.publish('driverUpdate', {DriversSubscription: user});
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      },
    ),
  },
};

export default resolvers;
