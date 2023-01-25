import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        role
      }
    }
  }
`;
export const ADD_ANNOUNCEMENT = gql`
  mutation createAnnouncement(
    $announcementTitle: String!
    $announcementBody: String!
  ) {
    createAnnouncement(
      announcementTitle: $announcementTitle
      announcementBody: $announcementBody
    ) {
      _id
      announcementBody
      createdAt
    }
  }
`;
export const ADD_LEAGUE = gql`
  mutation createLeague($leagueName: String!) {
    createLeague(leagueName: $leagueName) {
      _id
      leagueName
      leaguePlayers {
        _id
        firstName
        lastName
        playerNumber
        playerPosition
      }
    }
  }
`;
export const ADD_PLAYERS = gql`
  mutation createTeamMembers($firstName: String!, $lastName: String!, $playerNumber: String!,$playerPosition: String!,$playerLeague:ID!) {
    createTeamMembers(firstName: $firstName,lastName: $lastName,playerNumber: $playerNumber,playerPosition: $playerPosition,playerLeague:$playerLeague) {
      _id
      firstName
      lastName
      playerNumber
      playerPosition
      playerLeague{
        _id
        leagueName
      }
    }
  }
`;
