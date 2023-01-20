const { AuthenticationError } = require("apollo-server-express");
const omit = require("lodash.omit");

const { User, TeamMember, Announcement, League } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsers: async (parent, args, context) => {
      if (context.user) {
        const user = await User.find()
          .select("-__v -password")
          .populate("announcements");

        return user;
      }
      throw new AuthenticationError("Not logged in!");
    },
    getPlayersByLeague: async (parent, { leagueName }) => {
      const players = await League.find({ leagueName });

      if (!players) {
        throw new AuthenticationError("No players found in this league");
      }
      return players;
    },
    getLeagueById: async (parent, { _id }) => {
      const league = await League.findOne({ _id });
      if (!league) {
        throw new AuthenticationError("League not found!");
      }
      return league;
    },
    getPlayers: async (parent, args, context) => {
      if (context.players) {
        const players = await TeamMember.find();

        return players;
      }
      throw new AuthenticationError("No players found!");
    },
    getAnnouncements: async (parent, args, context) => {
      if (context.announcements) {
        const announcements = await Announcement.find();
        return announcements;
      }

      throw new AuthenticationError("No announcements found!");
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
      return { token, user};
    },
    updateUser: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        return User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const user = await User.findByIdAndDelete(context.user._id);
        return user;
      }

      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      omit(user._doc, "password");

      const token = signToken(user);

      return { token, user };
    },
    createAnnouncement: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const announcement = await Announcement.create(args);

        const userData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { announcements: announcement._id } },
          { new: true }
        );

        return announcement;
      }

      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    updateAnnouncement: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const updatedAnnouncement = await Announcement.findOneAndUpdate(
          { _id: args._id },
          args
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { announcements: args._id } },
          { new: true }
        );

        return updatedAnnouncement;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    createLeague: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const league = await League.create(args);

        const userData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { createdLeagues: league._id } },
          { new: true }
        );

        return league;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    updateLeague: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const updatedLeague = await League.findOneAndUpdate(
          { _id: args._id },
          args
        );

        await User.findByIdAndUpdate(
          { _id: context.admin._id },
          { $addToSet: { createdLeagues: args._id } },
          { new: true }
        );
        return updatedLeague;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    deleteLeague: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const league = await League.findByIdAndDelete({ _id: args._id });
        await User.findByIdAndUpdate(
          { _id: context.admin._id },
          { $pull: { createdLeagues: league._id } }
        );

        return league;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    createTeamMembers: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const teamMember = await TeamMember.create(args);

        const userData = await Admin.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { createdTeamMembers: teamMember._id } },
          { new: true }
        );

        return teamMember;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    updateTeamMember: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const updatedTeamMember = await TeamMember.findOneAndUpdate(
          { _id: args._id },
          args
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { createdTeamMembers: args._id } },
          { new: true }
        );

        return updatedTeamMember;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
    deleteTeamMember: async (parent, args, context) => {
      if (context.user.role === 'admin') {
        const teamMember = await TeamMember.findByIdAndDelete({
          _id: args._id,
        });
        await Admin.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { createdTeamMembers: teamMember._id } }
        );
        return teamMember;
      }
      throw new AuthenticationError("You must be an admin to perform this action!");
    },
  },
};

module.exports = resolvers;
