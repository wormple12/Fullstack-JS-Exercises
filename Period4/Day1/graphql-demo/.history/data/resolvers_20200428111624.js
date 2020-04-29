import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: async (root, { id }) => {
      return Friends.findOne({ _id: id });
    },
    getFriends: async () => {
      const result = await Friends.find();
      return result;
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        language: input.language,
        email: input.email,
        contacts: input.contacts,
      });

      newFriend.id = newFriend._id;
      return newFriend.save();
    },
    updateFriend: (root, { input }) => {
      return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
    },
    deleteFriend: async (root, { id }) => {
      const deletedFriend = await Friends.findOneAndDelete({ _id: id });
      return "Succesfully deleted friend";
    },
  },
};
