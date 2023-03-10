const { AuthenticationError } = require("apollo-server-express");
const omit = require("lodash.omit");

const { User, Announcement, League } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsers: async (parent, args, context) => {
      const user = await User.find()
        .select("-__v -password")
        .populate("announcements")
        .populate("createdLeagues");

      return user;
    },
    getLeagueById: async (parent, { _id }) => {
      const league = await League.findOne({ _id });
      if (!league) {
        throw new AuthenticationError("League not found!");
      }
      return league;
    },
    getLeagues: async (parent, args, context) => {
      const leagues = await League.find();
      return leagues;
    },
    getAnnouncements: async (parent, args, context) => {
      const announcements = await Announcement.find();
      return announcements;
    },
    getAnnouncementById: async (parent, { _id }) => {
      const announcement = await Announcement.findOne({ _id });
      if (!announcement) {
        throw new AuthenticationError("Annoucement not found with this id!");
      }
      return announcement;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      user.isAuthenticated = true;
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      omit(user._doc, "password");
      const token = signToken(user);

      return { token, user };
    },
    createAnnouncement: async (parent, args, contextValue) => {
      if (contextValue.user.role.includes("admin")) {
        const announcement = await Announcement.create(args);

        const userData = await User.findByIdAndUpdate(
          { _id: contextValue.user._id },
          { $push: { announcements: announcement._id } },
          { new: true }
        );

        return announcement;
      }

      throw new AuthenticationError(
        "You must be an admin to perform this action!"
      );
    },
    createLeague: async (parent, args, contextValue) => {
      if (contextValue.user.role.includes("admin")) {
        const league = await League.create(args);

        const userData = await User.findByIdAndUpdate(
          { _id: contextValue.user._id },
          { $push: { createdLeagues: league._id } },
          { new: true }
        );
        return league;
      }
      throw new AuthenticationError(
        "You must be an admin to perform this action!"
      );
    },
    addTeammate: async (parent, { leagueId, firstName,lastName,playerPosition,playerNumber }, contextValue) => {
      if (contextValue.user.role.includes("admin")) {
          const addMember = await League.findOneAndUpdate(
            {_id:leagueId},
            {
              $push:{
                leaguePlayers:{firstName,lastName,playerPosition,playerNumber}
              }
            },
            {new:true}
          )
          return addMember;
      }
      console.log(contextValue.user.role);
      throw new AuthenticationError(
        "You must be an admin to perform this action!"
      );
    },
  },
};

module.exports = resolvers;
