import gql from "graphql-tag";

// Users query =======================
export const TESTING = gql`
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

// Users mutation =======================
