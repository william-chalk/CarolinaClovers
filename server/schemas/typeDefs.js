const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    role: String
    isAuthenticated: Boolean
    announcements: [Announcement]
    createdLeagues: [League]
  }
  type Announcement {
    _id: ID
    announcementTitle: String
    announcementBody: String
    createdAt: String
  }
  type League {
    _id: ID
    leagueName: String
    playerCount: Int
    leaguePlayers: [TeamMember]
  }

  type TeamMember {
    _id: ID
    firstName: String
    lastName: String
    playerNumber: String
    playerPosition: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getLeagues: [League]
    getPlayers: [TeamMember]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addLeague(leagueName: String!): League
    addTeammate(
      leagueId: ID!
      firstName: String!
      lastName: String!
      playerPosition: String!
      playerNumber: String!
    ): League
    addAnnouncement(
      announcementTitle: String!
      announcementBody: String!
    ): Announcement
  }
`;

module.exports = typeDefs;
