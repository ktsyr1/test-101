


import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
// import { cacheSizes } from '@apollo/client/utilities';
// import { print } from '@apollo/client'

// cacheSizes.print = 100;
// cache sizes changed this way will only take effect for caches
// created after the cache size has been changed, so we need to
// reset the cache for it to be effective

// print.reset();


const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        // cache: new InMemoryCache({resultCacheMaxSize:0}),
        link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GraphQL, }),

        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
    });
});
