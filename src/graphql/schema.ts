import { gql } from "graphql-tag";

const typeDefs = gql`#graphql

    type User {
        id: Int!
        fullname: String!
        email: String!
        password: String!
        bio: String!
        image: String!
        create_at: Int! 
        verify_User: Boolean!
    }
      
    type Blog { 
        id: Int!
        title: String!
        content: String!  
        image: String!
        shortContent: String!
        categories: String!
        slug: String! 
    } 

    type Survey {
        id: Int!
        fullName: String!
        age: Int!
        occupation: String!
        city: String!
        gender: String!
        typeUser: String!
        accessChannels: String!
        generalLayout: String!
        informationFound: String!
        problem: String!
        suggest: String!
    } 
    
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
       
        UserUpdate(id: ID!, fullname: String, email: String ,bio:String ,image:String): User! 
        UserDelete(id: ID!): User!
         
        createSurvey(input: CreateSurveyInput!): Survey!
        deleteSurvey(id: Int!): Boolean!

      
    }

    input CreateSurveyInput {
        fullName: String!
        age: Int!
        occupation: String!
        city: String!
        gender: String!
        typeUser: String!
        accessChannels: String!
        generalLayout: String!
        informationFound: String!
        problem: String!
        suggest: String!
    } 
`;

export default typeDefs;
