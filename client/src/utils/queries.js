import { gql } from '@apollo/client';

export const queries = {
    QUERY_GET_ALL_USERS: gql`
      query allUsers {
        allUsers {
          _id
          name
          todos {
              _id
              title
              content
              dueDate
          }
        }
      }
    `,
    QUERY_GET_ONE_USER: gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            name
            todos {
                _id
                title
                content
                dueDate
            }
        }
    }`
}
