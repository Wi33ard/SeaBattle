import React from "react";
import { useQuery, gql } from '@apollo/client';
import './styles/UsersList.css';

const GET_USERS = gql`
query GetUsers {
  users {
    id
    name
  }
}
`;

export const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log('data: ', data);

  return(
    <div className="users-list">
      Users:
      { data.users.map(user => <h3>{user.name}</h3>)}
    </div>
  )

}