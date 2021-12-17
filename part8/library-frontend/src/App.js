import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log("writing book...");
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }

    const author = addedBook.author;
    const authorDataInStore = client.readQuery({ query: ALL_AUTHORS });
    if (!includedIn(authorDataInStore.allAuthors, author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorDataInStore.allAuthors.concat(author) },
      });
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const userToken = localStorage.getItem("library-user-token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>
      <div>{errorMessage}</div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook
        onError={notify}
        show={page === "add"}
        updateCacheWith={updateCacheWith}
      />

      <Recommend show={page === "recommend"} />

      <Login
        setPage={setPage}
        setToken={setToken}
        onError={notify}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
