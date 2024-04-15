import gql from "graphql-tag";


//  Surveyss query ======================= 

export const Surveys = gql`
   query Surveys {
        surveys {
            id
            fullName
            age
            occupation
            city
            gender
            typeUser
            accessChannels
            generalLayout
            informationFound
            problem
            suggest
        }
    }
`

export const Survey = gql`
    query Survey($id: Int!) {
        survey(id: $id) {
            id
            fullName
            age
            occupation
            city
            gender
            typeUser
            accessChannels
            generalLayout
            informationFound
            problem
            suggest
        }
    }
`
// mutation  Surveys
export const Surveys_Create = gql`
    mutation CreateSurvey($input: CreateSurveyInput!) {
        createSurvey(input: $input) {
            id
            fullName
            age
            occupation
            city
            gender
            typeUser
            accessChannels
            generalLayout
            informationFound
            problem
            suggest
        }
    }
`

export const Surveys_Update = gql`
    mutation  SurveysUpdate($id: ID!, $title: String!, $content: String!, $image: String!, $shortContent: String!, $categories: String!, $slug: String!) {
         SurveysUpdate(id: $id, title: $title, content: $content, image: $image, shortContent: $shortContent, categories: $categories, slug: $slug) {
            id
            title
            content
            image
            shortContent
            categories
            slug
        }
    }
`
export const Surveys_Delete = gql`
    mutation CreateSurvey($id: Int!) {
        deleteSurvey(id: $id)
    }
`
