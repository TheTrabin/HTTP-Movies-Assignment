import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const MovieUpdate = props => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    // gather the info for the item with id
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err =>
        console.error(
          "Upateform.js: useEffect: err: ",
          err.message,
          err.response
        )
      );
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    

    setMovie({
      ...movie,
      [ev.target.name]: value,
      [ev.target.stars]: ev.target.value.split(',')
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
       setMovie(res.data);
       push(`/movies/`)
      
        })

      .catch(err =>
        console.error(
          "UpdateForm.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Meta Score"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="actors"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
