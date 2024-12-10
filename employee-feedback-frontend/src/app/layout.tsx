"use client";
import { ApolloProvider } from '@apollo/client';
import  apolloClient  from '../lib/apollo-client'

import './globals.css'; // Adjust the path to your CSS file


export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
