import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import typeDefs from './typeDefs';

const schema = makeExecutableSchema({ typeDefs });

const mocks = {

};

addMockFunctionsToSchema({ schema, mocks });

export const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });