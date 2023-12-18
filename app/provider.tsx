'use client';
import { ACCESS_TOKEN, APP_ID, USER_ID } from '@/constants/const';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import dynamic from 'next/dynamic';

const SBProvide = dynamic(() => import('@sendbird/uikit-react/SendbirdProvider'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
export function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URI || 'http://localhost:6321/unprotected-graphql',
    cache: new InMemoryCache(),
  });
  return (
    <SBProvide appId={APP_ID} userId={USER_ID} accessToken={ACCESS_TOKEN}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SBProvide>
  );
}
