import React, { useEffect, useState } from 'react';
import { MovieDetailsContainer, DescriptionContainer, StyledImage } from "./MovieItemDetails.styles";
import { useParams } from "react-router-dom";
import axios from 'axios';

const MovieItemDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    axios.get(`/api/movie/${movieId}`).then(response => {
      setMovieDetails(response.data);
    });
  }, [movieId]);

  const formattedReleaseDate = (releaseDate) => {
      return releaseDate.slice(5, 16);
  }

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <MovieDetailsContainer>
        <StyledImage src={movieDetails.poster_path_w500} alt={movieDetails.title} rounded fluid />

        <DescriptionContainer>
          <h1>{movieDetails.title}</h1>
          <p>Reżyser: {movieDetails.director}</p>
          <p>Aktorzy: {movieDetails.actors}</p>
          <p>Data premiery: {formattedReleaseDate(movieDetails.release_date)}</p>
          <p>Czas trwania: {movieDetails.runtime} min</p>
          <p>Gatunek: {movieDetails.genre}</p>
          <p>Opis: {movieDetails.overview}</p>
          <p>Ocena : {movieDetails.vote_average}</p>
          <p>Ilość ocen : {movieDetails.vote_count}</p>
          {movieDetails.adult && <p>Film dla dorosłych</p>}
        </DescriptionContainer>
    </MovieDetailsContainer>
  );
}

export default MovieItemDetails;