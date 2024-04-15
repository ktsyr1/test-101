import { gql } from "graphql-tag";

const inputsGraphql = gql`#graphql
 
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
    
    input UserUpdateInput {
        id: ID!
        fullname: String
        email: String 
        bio:String 
        image:String
    }
`;

export default inputsGraphql;
