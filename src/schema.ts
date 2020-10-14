import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {GraphQLSchema} from 'graphql';
import path from 'path';


const allTypes: GraphQLSchema[] = loadFilesSync(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers: any[] = loadFilesSync(path.join(__dirname, '/api/**/*.resolvers.*'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
