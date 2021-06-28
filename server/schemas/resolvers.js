const { User, Todo } = require('../models');
const { Kind, GraphQLScalarType } = require('graphql');

const resolvers = {
  // CUSTOM SCALARS
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custon scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }
      return null;
    }
  }),

  // QUERIES
  Query: {
    allUsers: async () => {
      return User.find().populate('todos');
    },

    user: async (parent, { userId }) => {
      const user = User.findOne({ _id: userId }).populate('todos');
      return user;
    },
  },

  // MUTATIONS
  Mutation: {
    addUser: async (parent, { name, password }) => {
      return User.create({ name, password });
    },
    addTodo: async (parent, { userId, todoId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { todos: todoId },
        },
        {
          new: true,
          // runValidators: true,
        }
      ).populate('todos');
    },
    createTodo: async (parent, { title, content, dueDate = null }) => {
      return Todo.create({ title, content, dueDate })
    },
    // removeUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId });
    // },
    removeTodo: async (parent, { userId, todoId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { todos: todoId } },
        { new: true }
      ).populate('todos');
    },
  },
};

module.exports = resolvers;
