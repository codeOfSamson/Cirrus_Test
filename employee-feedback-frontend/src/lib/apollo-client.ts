// src/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your backend's GraphQL endpoint
  cache: new InMemoryCache(),
});

export default apolloClient;
