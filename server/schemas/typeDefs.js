const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    name: String
    todos: [Todo]!
  }

  type Todo {
    _id: ID
    title: String
    content: String
    dueDate: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]!
    user(userId: ID!): User
    me: User

  }

  type Mutation {
    addUser(name: String!, password: String!): Auth
    addTodo(userId: ID!, todoId: ID!): User
    deleteTodo(todoId: ID!): User
    createTodo(title: String!, content: String!, dueDate: String): User
    login(name: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
