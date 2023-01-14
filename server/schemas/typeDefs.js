const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    _id: ID
    username: String
    email: String
    password: String
    isAuthenticated: Boolean
    announcements: [Announcement]
  }
  type Announcement {
    _id: ID
    announcementBody: String
    createdAt: Date
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
    playerNumber: Number
    playerPosition: String
    playerLeague: League
  }

  type Auth {
    token: ID
    user: Admin
  }

  type Query {
    getLeagueById(_id: ID!): League
    getPlayersByLeague(leagueName: String!): [TeamMember]
    getPlayers: [TeamMember]
    getAdmins: [Admin]
    getAnnouncements: [Announcement]
    getAnnouncementById(_id: ID!): Announcement
  }

  type Mutation {
    createAdmin(username: String!, email: String!, password: String!): Auth
    updateAdmin(username: String!, email: String!, password: String!): Admin
    deleteAdmin: Admin
    login(email: String!, password: String!): Auth
    createAnnouncement(announcementBody: String!): Announcement
    updateAnnouncement(_id: ID!, announcementBody: String!): Announcement
    createLeague(leagueName: String!): League
    createTeamMembers(
      firstName: String!
      lastName: String!
      playerNumber: Number!
      playerPosition: String!
      playerLeague: String!
    ): TeamMember
    updateTeamMember(
      _id: ID!
      firstName: String!
      lastName: String!
      playerNumber: Number!
      playerPosition: String!
      playerLeague: String!
    ): TeamMember
  }
`;

module.exports = typeDefs;
