


import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    }
}

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        // cache: new InMemoryCache({resultCacheMaxSize:0}),
        link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GraphQL, }),

        cache: new InMemoryCache({}),
        defaultOptions: defaultOptions,
    });
});
