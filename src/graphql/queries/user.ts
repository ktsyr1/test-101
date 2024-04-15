import gql from "graphql-tag";

// Users query =======================
export const GET_USERS = gql`
   query Users {
        users {
            fullname
            email
            verify_User
            create_at
            id
        }
    }
`
export const GET_USER_ONE = gql`
   query Users {
        users {
            fullname
            email
            verify_User
            create_at
            bio
            id
        }
    }
`
// Users mutation =======================

export const UPDATE_USER_ONE = gql`
   mutation UserUpdate(
        $id: ID!
        $email: String
        $bio: String
        $fullname: String
    ) {
        UserUpdate(id: $id, email: $email, bio: $bio, fullname: $fullname) {
            fullname
            email
            image
        }
    } 
`

export const DELETE_USER_ONE = gql`    
    mutation UserDelete($id: ID!) {
        UserDelete(id: $id) {
            id
        }
    }
` 