import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import {RequestEmailVerificationResponse} from '../../../types/graph';
import {Resolvers} from '../../../types/resolvers';
import privateResolver from '../../../util/privateResolver';
import {sendVerificationMail} from '../../../util/sendMail';

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, {req}): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email,
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: 'EMAIL',
            }).save();
            await sendVerificationMail(user.fullName, user.email, newVerification.key);
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
        } else {
          return {
            ok: false,
            error: 'Your user has no email to verify',
          };
        }
      },
    ),
  },
};

export default resolvers;
