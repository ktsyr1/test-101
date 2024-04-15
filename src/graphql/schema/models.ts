import { gql } from "graphql-tag";

const modelsGraphql = gql`#graphql

    type User {
        id: Int!
        fullname: String!
        email: String!
        password: String!
        bio: String!
        image: String!
        create_at: String! 
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
        create_at: String! 
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
        create_at: String! 
    }  
`;

export default modelsGraphql;
