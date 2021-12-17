import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const UpdateAuthor = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0].name);
  const [birthYear, setBirthYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    console.log("updating author..");
    editAuthor({ variables: { name: author, setBornTo: Number(birthYear) } });

    setAuthor(authors[0].name);
    setBirthYear("");
  };

  return (
    <div>
      Set Author Birth Year
      <form onSubmit={submit}>
        <div>
          Name
          <select
            value={author}
            name="name"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          >
            {authors.map((a, i) => {
              return <option key={i}>{a.name}</option>;
            })}
          </select>
        </div>
        <div>
          Born
          <input
            value={birthYear}
            onChange={(e) => {
              setBirthYear(e.target.value);
            }}
            name="born"
            type="number"
            required
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
