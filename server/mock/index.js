import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import typeDefs from './typeDefs';

const schema = makeExecutableSchema({ typeDefs });

const mocks = {

};

addMockFunctionsToSchema({ schema, mocks });