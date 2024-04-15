import { gql } from "graphql-tag";
import modelsGraphql from "./models";
import inputsGraphql from "./inputs";

const typeDefs = gql`#graphql

    ${modelsGraphql}

    type Query {
        blogs: [Blog!]!
        blog(id: ID!): Blog

        users: [User!]!
        user(id: ID!): User
        
        surveys: [Survey!]!
        survey(id: Int!): Survey
    }
      
    type Mutation {
        
        AuthInvit (fullname: String!, password: String!, image: String!) : User
        AuthInvitCreate(email: String) :String!
        Authlogin (email: String!, password: String!): User! 
          
        BlogCreate (title: String!, content: String!, image: String! , shortContent: String!, categories: String!, slug: String! ): Blog!
        BlogUpdate (id: ID!, title: String!, content: String!, image: String!, shortContent: String!, categories: String!, slug: String! ): Blog!
        BlogDelete (id: ID!): Boolean!
       
        UserUpdate(input: UserUpdateInput): User! 
        UserDelete(id: ID!): User!
         
        createSurvey(input: CreateSurveyInput!): Survey!
        deleteSurvey(id: Int!): Boolean!

    }
 
    ${inputsGraphql}
`;

export default typeDefs;
