// src/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, 
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('authToken');

  // Use the setContext method to set the HTTP headers
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '', // Add the token if it exists
    },
  });

  // Call the next link in the middleware chain
  return forward(operation);
});



const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
