import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_FRIENDS = gql`
  {
    getFriends {
      id
      firstName
      lastName
      gender
      age
    }
  }
`;
const ADD_FRIEND = gql`
  mutation createFriend($input: FriendInput!) {
    createFriend(input: $input) {
      id
      firstName
      lastName
      gender
      age
    }
  }
`;
const UPDATE_FRIEND = gql`
  mutation updateFriend($input: FriendInput!) {
    updateFriend(input: $input) {
      id
      firstName
      lastName
      gender
      age
    }
  }
`;

const AddFriend = ({ initialFriend, allowEdit }) => {
  const EMPTY_FRIEND = {
    firstName: "",
    lastName: "",
    gender: "OTHER",
    age: "",
    email: "",
  };
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND };

  const [friend, setFriend] = useState({ ...newFriend });

  const [createFriend, { data }] = useMutation(ADD_FRIEND, {
    update(cache, { data }) {
      const newFriend = data.createFriend;
      const { getFriends } = cache.readQuery({ query: ALL_FRIENDS });
      getFriends.push(newFriend);
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getFriends: [...getFriends] },
      });
    },
  });

  const [updateFriend] = useMutation(UPDATE_FRIEND, {
    update(cache, { data }) {
      const newFriend = data.updateFriend;
      const { getFriends } = cache.readQuery({ query: ALL_FRIENDS });
      const index = getFriends.findIndex((friend) => friend.id == newFriend.id);
      getFriends[index] = newFriend;
      cache.writeQuery({
        query: ALL_FRIENDS,
        data: { getFriends: [...getFriends] },
      });
    },
  });

  const handleChange = (event) => {
    const id = event.target.id;
    friend[id] = event.target.value;
    setFriend({ ...friend });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = {
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      email: friend.email,
      age: Number(friend.age),
      gender: friend.gender,
    };
    if (!initialFriend) {
      createFriend({
        variables: { input },
      });
    } else {
      updateFriend({
        variables: { input },
      });
    }
    setFriend({ ...EMPTY_FRIEND });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName
        <br />
        <input
          type="text"
          readOnly={!allowEdit}
          id="firstName"
          value={friend.firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        LastName <br />
        <input
          readOnly={!allowEdit}
          type="text"
          id="lastName"
          value={friend.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender &nbsp;
        <select
          disabled={!allowEdit}
          id="gender"
          value={friend.gender}
          onChange={handleChange}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <br />
      <label>
        Age <br />
        <input
          readOnly={!allowEdit}
          type="number"
          id="age"
          value={friend.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      {allowEdit && <input type="submit" value="Submit" />}
    </form>
  );
};

export default AddFriend;
