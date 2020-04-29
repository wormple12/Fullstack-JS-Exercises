import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: ({ input }) => {
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
    updateFriend: ({ input }) => {
      return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
    },
    deleteFriend: ({ id }) => {
      return Friends.remove({ _id: id });
    },
  },
};
