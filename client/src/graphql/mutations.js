import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
        admin{
            _id
            username
        }
    }
}
`
export const CREATE_ADMIN = gql`
mutation createAdmin($username:String!,$email:String!,$password:String!){
    createAdmin(username:$username,email:$email,password:$password){
        token
        admin{
            _id
            username
        }
    }
}
`
export const ADD_ANNOUNCEMENT = gql`
mutation createAnnouncement($announcementBody:String!){
    createAnnouncement(announcementBody:$announcementBody){
        _id
        announcementBody
        createdAt
    }
}
`
export const ADD_LEAGUE = gql`
mutation createLeague($leagueName:String!){
    createLeague(leagueName:$leagueName){
        _id
        leagueName
        leaguePlayers{
            _id
            firstName
            lastName
            playerNumber
            playerPosition
        }
    }
}
`
export const ADD_PLAYERS = gql`
mutation createTeamMembers($firstName:String!,$lastName:String!,$playerNumber:Int!,$playerPosition:String!,$playerLeague:String!){
    createTeamMembers(firstName:$firstName,lastName:$lastName,playerNumber:$playerNumber,playerPosition:$playerPosition,playerLeague:$playerLeague){
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
`
