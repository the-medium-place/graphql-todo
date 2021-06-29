import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $password: String!) {
    addUser(name: $name, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($title: String!, $content: String!, $dueDate: String) {
    createTodo(title: $title, content: $content, dueDate: $dueDate) {
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

export const DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
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