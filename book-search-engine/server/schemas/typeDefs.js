const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  me: User
}



type User {
  _id: ID!
  username: String
  email: String
  bookCount: Int
  password:String
  savedBooks: [Book]
}

type Book {
  _id: ID!
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

input savedBook {
  description: String!
  title: String
  bookId: String!
  image: String
  link: String
  authors: [String]
}

type Auth {
  token: ID!
  user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
