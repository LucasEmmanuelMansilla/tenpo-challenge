import {ComponentProps, ComponentType} from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { SessionProvider } from './context/SessionContext';

type Providers = [ComponentType<any>, ComponentProps<any>?][];

const queryClient = new QueryClient();

const CombineProviders = (providers: Providers) =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({children}) =>
        (
          <AccumulatedProviders>
            <Provider {...props}>
              <>{children}</>
            </Provider>
          </AccumulatedProviders>
        ),
    ({children}: any) => <>{children}</>,
  );

export const AllProviders = CombineProviders([
  [QueryClientProvider, {client: queryClient}],
  [AuthProvider],
  [SessionProvider],
]);
