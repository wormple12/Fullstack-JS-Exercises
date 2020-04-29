import { Friends, Aliens } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: async ({ id }) => {
      const result = await Friends.findOne({ _id: id });
      return result;
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastname: input.lastname,
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
      const deleteFriend = await Friends.findOneAndDelete({ _id: id });
      return "deleted";
    },
  },
};
