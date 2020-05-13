import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_FRIENDS = gql`
  {
    getFriends {
      id
      firstName
      lastName
      language
      gender
      age
      email
    }
  }
`;

const DELETE_FRIEND = gql`
  mutation deleteFriend($id: ID!) {
    deleteFriend(id: $id)
  }
`;

export default function All() {
  const { loading, error, data, refetch } = useQuery(ALL_FRIENDS, { pollInterval: 10000 });
  //const { loading, error, data, networkStatus } = useQuery(ALL_FRIENDS, { fetchPolicy: "no-cache" });
  //const { loading, error, data } = useQuery(ALL_FRIENDS, { pollInterval: 15000 });

  const [deleteFriend] = useMutation(DELETE_FRIEND);
  const onDeleteFullRefetch = id => {
    deleteFriend({ variables: { id: id } });
    refetch();
  };

  const onDeleteUpdateCache = id => {
    deleteFriend({
      variables: { id },
      update(cache) {
        const { getFriends } = cache.readQuery({ query: ALL_FRIENDS });
        const newFriends = getFriends.filter(f => f.id !== id);
        cache.writeQuery({
          query: ALL_FRIENDS,
          data: { getFriends: newFriends }
        });
      }
    });
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) return <p> {JSON.stringify(error)}</p>;
  if (!data) {
    return <p>No Data</p>;
  }
  return data.getFriends.map(f => {
    const age = f.age ? `, Age: ${f.age}` : null;
    return (
      <p key={f.id}>
        {f.id}, {f.firstName} {f.lastName}, {f.gender}, {f.email} {age}
        &nbsp;
        <a href="#" onClick={() => onDeleteFullRefetch(f.id)}>
          Delete (Refetch All)
        </a>
        , &nbsp;
        <a href="#" onClick={() => onDeleteUpdateCache(f.id)}>
          Delete (Update Cache)
        </a>
      </p>
    );
  });
}
