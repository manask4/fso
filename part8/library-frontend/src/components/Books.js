import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [getBooksByGenre, booksByGenre] = useLazyQuery(BOOKS_BY_GENRE);

  const books = result.data && result.data.allBooks ? result.data.allBooks : [];

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setFilteredBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genre !== null) {
      getBooksByGenre({ variables: { genre } });
    } else {
      setFilteredBooks(books);
    }
  }, [genre, getBooksByGenre, books]);

  useEffect(() => {
    if (genre !== null && booksByGenre.data) {
      setFilteredBooks(booksByGenre.data.allBooks);
    }
  }, [genre, booksByGenre.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return (
      <div>
        <h2>Books</h2>
        <div>Loading...</div>
      </div>
    );
  }

  let genres = [];
  books.forEach((book) => {
    genres = genres.concat(book.genres);
  });
  genres = genres.filter((genre, pos) => genres.indexOf(genre) === pos);

  const handleGenreChange = (e) => {
    const genreValue = e.target.value === "all" ? null : e.target.value;
    setGenre(genreValue);
  };

  return (
    <div>
      <h2>Books</h2>
      <div>
        <span>Filter Genre</span>
        <select onChange={handleGenreChange}>
          <option value="all">All</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
