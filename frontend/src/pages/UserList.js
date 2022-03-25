import axios from "axios";
import React, { useEffect, useState } from "react";

import Card2 from "../components/Card2";
import Header from "../components/Header";

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `http://localhost:8055/items/Posters/${moviesId[i]}`
        )
        .then((res) => setListData((listData) => [...listData, res.data.data]));
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Coup de coeur <span>💖</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card2 movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
