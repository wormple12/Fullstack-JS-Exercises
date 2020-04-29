import { Friends, Aliens } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return Friends.findOne({ _id: id });
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
      const deleteFriend = Friends.findOneAndDelete(
        { _id: id },
        () => "DELETED"
      );
      return "deleted";
    },
  },
};
