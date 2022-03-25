import React from "react";
import { Divider, IconButton } from "@mui/material";
import { useModal, Modal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";

const Card = ({ movie }) => {
  const { modalProps, getTriggerProps } = useModal();
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const Button = (props) => (
    <i class="fa-solid fa-compress" {...props.getTriggerProps()}></i>
  );

  const addStorage = () => {
    alert("Poster Ajouté aux Favoris")
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");

    let newData = storedData.filter((id) => id != movie.id);

    window.localStorage.movies = newData;
  };

  return (
    <div className="card">
      <img
        src={"http://localhost:8055/assets/" + movie.poster}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <h5>Sortie le : {dateFormater(movie.release_date)}</h5>
      <h5> Créer le : {dateFormater(movie.Created_at)}</h5>
      <ul>
        {movie.categories.map((tag) => (
          <li key={tag}> {tag}</li>
        ))}
      </ul>
       <h3>Description</h3>
      <p>{movie.description}</p>
      <div className="btn">
        <a
          className="downPost"
          href={"http://localhost:8055/assets/" + movie.poster + "?download"}
        >
          <IconButton sx={{ color: "white" }}>
            <i class="fa-solid fa-download"></i>
          </IconButton>
        </a>
      </div>
      <div className="btn3">
        <IconButton sx={{ color: "white" }}>
          <i class="fa-solid fa-heart" onClick={() => addStorage()}></i>
        </IconButton>
      </div>
      <div className="btn2">
        <IconButton sx={{ color: "white" }}>
          <Button getTriggerProps={getTriggerProps} />
        </IconButton>
      </div>
      <Divider/>
      <Modal {...modalProps} className="DisplayModale">
        <img
          className="imgModale"
          src={"http://localhost:8055/assets/" + movie.poster}
          alt={movie.title}
        />
      </Modal>
    </div>
  );
};

export default Card;
