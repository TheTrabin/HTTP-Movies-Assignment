import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, setMovieList }) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => 
      setMovie(res.data)
      
      )
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const getNewList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => 
        setMovieList(res.data)
        )
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log("delete", res.data);
        // this.setMovie({movie: res.data});
        getNewList();
        push(`/`);
        
      })
      .catch(err =>
        console.error("Movie.js: handleDelete: err: ", err.message, err.response)
      );
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  


  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        className="md-button"
        onClick={() => push(`/update-movie/${movie.id}`)}
      >
        Edit
      </button>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
