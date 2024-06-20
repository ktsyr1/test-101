


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
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GraphQL,
            fetchOptions: { cache: 'no-store' }
        }),

        cache: new InMemoryCache({}),
        defaultOptions: defaultOptions,
    });
});

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://your-graphql-endpoint.com/graphql',
        // يمكنك تعطيل الكاش بإزالة InMemoryCache أو وضع سياسة الكاش لتجنب استخدام الكاش

    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    yourQueryFieldName: {
                        // تعطيل الكاش لهذا الاستعلام
                        read(_, { args, toReference }) {
                            return undefined; // اجعل Apollo يتجاهل الكاش لهذا الاستعلام
                        }
                    }
                }
            }
        }
    })
});
