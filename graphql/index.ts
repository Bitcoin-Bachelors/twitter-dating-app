import gql from 'graphql-tag'

// Create a new record in the users table when users signup
export const CREATE_USERS = gql`
mutation ($id: String!, $userType: String!, $email: String!, $phone_number: String! ) {
  insert_users(objects: { id: $id, userType: $userType, email: $email, phone_number: $phone_number, last_seen: "now()", created_at: "now()" }) {
    returning {
      id
      email
      last_seen
      created_at
      phone_number
      username
      userType
    }
  }
}
`

export const UPDATE_USERS = gql`
mutation ($id: String!, $username: String) {
  update_users_by_pk(objects: {id: $id, userType: $userType})(
    returning {
       id
    }
  }
}
`

// Create a new user record when a user signup
export const CREATE_USERS_BIO = gql`
mutation ($id: String!, $gender: String!, $looking_for: String! ) {
  insert_bios(objects: { id: $id, gender: $gender, looking_for: $looking_for }) {
    returning {
      id
      gender
      looking_for
    }
  }
}
`