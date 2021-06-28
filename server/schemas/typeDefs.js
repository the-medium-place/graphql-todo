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

  type Query {
    allUsers: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(name: String!, password: String!): User
    addTodo(userId: ID!, todoId: ID!): User
    removeTodo(todoId: ID!): User
    createTodo(title: String!, content: String!, dueDate: String): Todo
  }
`;

module.exports = typeDefs;
