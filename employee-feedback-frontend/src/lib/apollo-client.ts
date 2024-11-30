import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Ensure this matches your NestJS backend GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
