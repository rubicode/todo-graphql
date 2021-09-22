var { buildSchema } = require('graphql');
var Todo = require('../models/Todo');

const schema = buildSchema(`
  input TodoInput {
    title: String!
    complete: Boolean
  }

  type Todo {
    _id: ID!
    title: String!
    complete: Boolean!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoInput): Todo
    deleteTodo(id: ID!): Todo
  }
`);


const root = {
    getTodos: async () => {
        try {
            const todos = Todo.find({})
            return todos;
        } catch (err) {
            throw err
        }
    },
    createTodo: async ({ input }) => {
        try {
            const todo = Todo.create(input)
            return todo
        } catch (err) {
            throw err
        }
    },
    updateTodo: async ({ id, input }) => {
        try {
            const todo = Todo.findByIdAndUpdate(id, input, {new: true})
            return todo
        } catch (err) {
            throw err
        }
    },
    deleteTodo: async ({ id }) => {
        try {
            const todo = Todo.findByIdAndRemove(id)
            return todo
        } catch (err) {
            throw err
        }
    }
};

/*

{
  getTodos{
    _id
    title
    complete
  }
}

mutation {
  createTodo(input: {
    title: "kerja"
  }) {
    _id
    title
  }
}

*/

module.exports = {schema, root}