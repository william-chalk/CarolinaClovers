const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    isAuthenticated: Boolean
    announcements: [Announcement]
    createdLeagues: [League]
    createdTeamMembers: [TeamMember]
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
    getLeagueById(_id: ID!): League
    getLeagues: League
    getPlayers(firstName: String, lastName: String): [TeamMember]
    getUsers: [User]
    getAnnouncements: [Announcement]
    getAnnouncementById(_id: ID!): Announcement
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(
      username: String!
      email: String!
      password: String!
      role: String
    ): User
    deleteUser: User
    login(email: String!, password: String!): Auth
    createAnnouncement(
      announcementTitle: String!
      announcementBody: String!
    ): Announcement
    updateAnnouncement(
      _id: ID!
      announcementTitle: String!
      announcementBody: String!
    ): Announcement
    createLeague(leagueName: String!): League
    updateLeague(leagueName: String!): League
    deleteLeague: League
    createTeamMembers(
      firstName: String!
      lastName: String!
      playerNumber: String!
      playerPosition: String!
      playerLeague: String!
    ): TeamMember
    updateTeamMember(
      _id: ID!
      firstName: String!
      lastName: String!
      playerNumber: String!
      playerPosition: String!
      playerLeague: String!
    ): TeamMember
    deleteTeamMember: TeamMember
  }
`;

module.exports = typeDefs;
