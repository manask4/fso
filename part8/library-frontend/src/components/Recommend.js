import React, { useEffect, useState } from "react";
import { ME, BOOKS_BY_GENRE } from "../queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const Recommend = (props) => {
  const result = useQuery(ME);
  const [getRecommendations, recommendations] = useLazyQuery(BOOKS_BY_GENRE);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  useEffect(() => {
    if (result.data && result.data.me) {
      setFavoriteGenre(result.data.me.favoriteGenre);
      getRecommendations({
        variables: { genre: result.data.me.favoriteGenre },
      });
    }
  }, [result.data, getRecommendations]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendations.data &&
            recommendations.data.allBooks.map((b) => (
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

export default Recommend;
