"use client";

import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ApolloLink, HttpLink, ApolloProvider } from "@apollo/client";
import { ApolloProviderProps } from "@apollo/client/react/context";


// export function ApolloWrapper({ children }: any) {
    function makeClient() {
        const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GraphQL, });

        return new NextSSRApolloClient({
            cache: new NextSSRInMemoryCache(),
            link: typeof window === "undefined" ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true, }), httpLink,]) : httpLink,
        });
    }
//     return (
// <ApolloProviderProps >

// </ApolloProviderProps>
//         // <ApolloProvider client= { makeClient } >
//         // { children }
//         // < /ApolloProvider>
//   );
// }