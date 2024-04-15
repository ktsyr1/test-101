import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import schema from "@/graphql/schema"; // Import the schema
import resolvers from "@/graphql/resolvers"; // Import the resolvers

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});
export { handler as GET, handler as POST };
