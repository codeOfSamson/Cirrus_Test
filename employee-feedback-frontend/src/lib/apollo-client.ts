// src/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink  } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ,
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
