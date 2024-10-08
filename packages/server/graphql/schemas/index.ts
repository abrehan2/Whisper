export const graphEntities = `#graphql

type Avatar {
    public_id: String
    url: String!
}

enum Gender {
    male,
    female
}

enum Role {
  user
  admin
}

enum Check {
  credentials
  google
}

type Response {
    success: Boolean!
    message: String
    user: User
    token: String
}


type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  avatar: Avatar
  age: Int
  dob: String
  country: String!
  gender: Gender
  googleId: String
  role: Role!
  check: Check!
  resetPasswordToken: String
  resetPasswordExpire: String
}

type Query {
    user(id: ID!): User
    users: [User!]!
}

type Mutation {
    Register(name: String!, email: String!, password: String, country: String!, check: Check!): Response
    Login(email: String!, password: String!): Response
}
`;

// [User!]: This part means that the result is an array of User objects, and each User object in that array cannot be null. In other words, every item in the array is guaranteed to be a valid User.
// [User!]! at the end: This indicates that the array itself cannot be null. This means the query will always return an array, even if it’s empty.
