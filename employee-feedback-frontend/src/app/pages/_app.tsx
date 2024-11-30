import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apollo-client';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
