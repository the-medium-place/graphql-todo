import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
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
    `
export const GET_ONE_USER = gql`
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

export const GET_ME = gql`
    query me {
     me {
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
  `;