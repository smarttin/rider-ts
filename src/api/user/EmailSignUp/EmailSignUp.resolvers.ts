import {EmailSignUpMutationArgs, EmailSignUpResponse} from 'src/types/graph';
import {Resolvers} from 'src/types/resolvers';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import createJwt from '../../../util/createJwt';
import {sendVerificationMail} from '../../../util/sendMail';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      const {email, phoneNumber} = args;
      try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
          return {
            ok: false,
            error: 'You should log in instead',
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: phoneNumber,
            verified: true,
          });
          if (phoneVerification) {
            const newUser = await User.create({...args}).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: 'EMAIL',
              }).save();
              await sendVerificationMail(newUser.fullName, newUser.email, emailVerification.key);
            }
            const token = createJwt(newUser.id);
            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null,
            };
          }
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
