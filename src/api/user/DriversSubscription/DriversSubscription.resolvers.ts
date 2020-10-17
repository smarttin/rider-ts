// import {withFilter} from 'graphql-yoga';
// import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, {pubSub}) => {
        return pubSub.asyncIterator('driverUpdate');
      }
    },
  },
};

export default resolvers;
