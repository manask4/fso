import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import UpdateAuthor from "./UpdateAuthor";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return (
      <div>
        <h2>Authors</h2>
        <div>Loading...</div>
      </div>
    );
  }

  const authors = result.data.allAuthors || [];

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {props.token && <UpdateAuthor authors={authors} />}
    </div>
  );
};

export default Authors;
