import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_FRIENDS = gql`
  {
    getFriends {
      id
      firstName
      lastName
      gender
      age
      language
      email
    }
  }
`;

const All = () => {
  const { loading, error, data, networkStatus } = useQuery(ALL_FRIENDS);
  //const { loading, error, data, networkStatus } = useQuery(ALL_FRIENDS, { fetchPolicy: "no-cache" });
  //const { loading, error, data, networkStatus } = useQuery(ALL_FRIENDS, { pollInterval: 15000 });
  if (loading) return <h3>Loading...</h3>;
  if (error) return <p> {JSON.stringify(error)}</p>;
  if (!data) return <p>No Data</p>;

  return data.getFriends.map((f) => {
    const age = f.age ? `, Age: ${f.age}` : null;
    return (
      <p key={f.id}>
        {f.id}, {f.firstName} {f.lastName}, {f.gender}, {f.email} {age}{" "}
      </p>
    );
  });
};

export default All;
