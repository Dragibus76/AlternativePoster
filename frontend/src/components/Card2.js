import React from "react";
import { Divider, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal, Modal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";

const Card = ({ movie }) => {
  const { modalProps, getTriggerProps } = useModal();
  const dateFormater = (date) => {
    let [yy, mm, dd] = date;
    return [dd, mm, yy].join("/");
  };
  const Button = (props) => (
    <i class="fa-solid fa-compress" {...props.getTriggerProps()}></i>
  );

  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
    }
  };

  const deleteStorage = () => {
      alert("Poster Supprimé des Favoris")
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
      {movie.realease_date ? (
        <h5>Sorti le : {dateFormater(movie.realease_date)}</h5>
      ) : (
        ""
      )}
      <h4> Créer le : {dateFormater(movie.Created_at)}</h4>
      <Divider variant="middle"/>
      <ul>
        {movie.categories.map((tag) => (
          <li key={tag}> {tag}</li>
        ))}
      </ul>
      {movie.description ? <h3>Synopsis</h3> : ""}
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
        <IconButton sx={{ color: "red" }}>
          <i
            class="fa-solid fa-trash"
            onClick={() => {
              deleteStorage();
              window.location.reload();
            }}
          ></i>
        </IconButton>
      </div>
      <div className="btn2">
        <IconButton sx={{ color: "white" }}>
          <Button getTriggerProps={getTriggerProps} />
        </IconButton>
      </div>
      <Modal {...modalProps}>
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
