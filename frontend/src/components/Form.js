import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8055/items/Posters?search=${search}`
      )
      .then((res) => setMoviesData(res.data.data));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Recent<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Ancien<span>➜</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.id - a.id;
            } else if (sortGoodBad === "badToGood") {
              return a.id - b.id;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
