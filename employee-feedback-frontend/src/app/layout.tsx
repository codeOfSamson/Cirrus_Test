"use client";
import { ApolloProvider } from '@apollo/client';
import  apolloClient  from '../lib/apollo-client'
import { AuthProvider } from './context/AuthContext';
import './globals.css'; 
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Navbar />
          {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
