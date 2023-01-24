import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getAllUsers {
    getUsers {
      _id
      username
      email
      role
      announcements {
        _id
        announcementTitle
        announcementBody
        createdAt
      }
      createdLeagues {
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
      createdTeamMembers {
        _id
        firstName
        lastName
        playerNumber
        playerPosition
        playerLeague {
          _id
          leagueName
        }
      }
    }
  }
`;

export const QUERY_PLAYERS = gql`
  query getPlayers($firstName: String, $lastName: String) {
    getPlayers(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      playerNumber
      playerPosition
      playerLeague {
        _id
        leagueName
      }
    }
  }
`;

export const QUERY_PLAYERS_BY_LEAGUE = gql`
  query getPlayersByLeague($leagueName: String!) {
    getPlayersByLeague(leagueName: $leagueName) {
      _id
      firstName
      lastName
      playerNumber
      playerPosition
      playerLeague {
        _id
        leagueName
      }
    }
  }
`;

export const QUERY_ANNOUNCEMENTS = gql`
  query getAnnouncements($username:String) {
    getAnnouncements(username:$username) {
      _id
      announcementTitle
      announcementBody
      createdAt
    }
  }
`;
export const QUERY_ANNOUNCEMENT_BY_ID = gql`
  query getAnnouncementById($_id: ID!) {
    getAnnouncementById(_id: $_id) {
      _id
      announcementBody
      createdAt
    }
  }
`;

export const QUERY_LEAGUES = gql`
  query getLeagues {
    getLeagues {
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
