const { User, Todo } = require('../models');
const { Kind, GraphQLScalarType } = require('graphql');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


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
    me: async (parent, args, context) => {
      // console.log(context)
      if (context.user) {
        const loggedInUser = await User.findOne({ _id: context.user._id }).populate('todos');
        console.log(loggedInUser)
        return loggedInUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  // MUTATIONS
  Mutation: {
    addUser: async (parent, { name, password }) => {
      const newUser = await User.create({ name, password });
      console.log('resolvers.js newUser: ', newUser)
      const token = signToken(newUser);
      return { token, newUser };
    },
    login: async (parent, { name, password }) => {
      // console.log("inside the resolvers.js login function")
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ name });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.validatePassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addTodo: async (parent, { userId, todoId }, context) => {
      if (context.user) {

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
      }
      throw new AuthenticationError('You are not logged in!');

    },
    createTodo: async (parent, { title, content, dueDate = null }, context) => {
      // console.log("heres context: ", context.user)
      if (context.user) {
        const newTodo = await Todo.create({ title, content, dueDate })
        // console.log(newTodo)
        // return newTodo

        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { todos: newTodo._id },
          },
          {
            new: true,
            // runValidators: true,
          }
        ).populate('todos');
      }
      throw new AuthenticationError('You are not logged in!');
    },
    // removeUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId });
    // },
    removeTodo: async (parent, { todoId }, context) => {
      if (context.user) {
        Todo.findByIdAndDelete(todoId)

        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { todos: todoId } },
          { new: true }
        ).populate('todos');
      }
      throw new AuthenticationError('You are not logged in!');

    },
  },
};

module.exports = resolvers;
