const { AuthenticationError } = require("apollo-server-express");
const omit = require("lodash.omit");

const { Admin, TeamMember, Announcement, League } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAdmins: async (parent, args, context) => {
      if (context.admin) {
        const admin = await Admin.find()
          .select("-__v -password")
          .populate("announcements");

        return admin;
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
    createAdmin: async (parent, args) => {
      const admin = await Admin.create(args);
      const token = signToken(admin);
      admin.isAuthenticated = true;
      return { token, admin };
    },
    updateAdmin: async (parent, args, context) => {
      if (context.admin) {
        return Admin.findByIdAndUpdate(context.admin._id, args, { new: true });
      }
      throw new AuthenticationError("Not logged in!");
    },
    deleteAdmin: async (parent, args, context) => {
      if (context.admin) {
        const admin = await Admin.findByIdAndDelete(context.admin._id);
        return admin;
      }

      throw new AuthenticationError("not logged in!");
    },
    login: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      omit(admin._doc, "password");

      const token = signToken(admin);

      return { token, user };
    },
    createAnnouncement: async (parent, args, context) => {
      if (context.admin) {
        const announcement = await Announcement.create(args);

        const adminData = await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $push: { announcements: announcement._id } },
          { new: true }
        );

        return announcement;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateAnnouncement: async (parent, args, context) => {
      if (context.admin) {
        const updatedAnnouncement = await Announcement.findOneAndUpdate(
          { _id: args._id },
          args
        );
        await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $addToSet: { announcements: args._id } },
          { new: true }
        );

        return updatedAnnouncement;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createLeague: async (parent, args, context) => {
      if (context.admin) {
        const league = await League.create(args);

        const adminData = await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $push: { createdLeagues: league._id } },
          { new: true }
        );

        return league;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateLeague: async (parent, args, context) => {
      if (context.admin) {
        const updatedLeague = await League.findOneAndUpdate(
          { _id: args._id },
          args
        );

        await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $addToSet: { createdLeagues: args._id } },
          { new: true }
        );
        return updatedLeague;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteLeague: async (parent, args, context) => {
      if (context.admin) {
        const league = await League.findByIdAndDelete({ _id: args._id });
        await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $pull: { createdLeagues: league._id } }
        );

        return league;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createTeamMembers: async (parent, args, context) => {
      if (context.admin) {
        const teamMember = await TeamMember.create(args);

        const adminData = await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $push: { createdTeamMembers: teamMember._id } },
          { new: true }
        );

        return teamMember;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTeamMember: async (parent, args, context) => {
      if (context.admin) {
        const updatedTeamMember = await TeamMember.findOneAndUpdate(
          { _id: args._id },
          args
        );

        await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $addToSet: { createdTeamMembers: args._id } },
          { new: true }
        );

        return updatedTeamMember;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteTeamMember: async (parent, args, context) => {
      if (context.admin) {
        const teamMember = await TeamMember.findByIdAndDelete({
          _id: args._id,
        });
        await Admin.findByIdAndUpdate(
          { _id: context.admin._id },
          { $pull: { createdTeamMembers: teamMember._id } }
        );
        return teamMember;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
