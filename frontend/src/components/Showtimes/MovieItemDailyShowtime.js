import React from 'react';
import { StyledMovieItemDailyShowtime} from "./MovieItemDailyShowtime.styles";
import { Link } from 'react-router-dom';


const MovieItemForDailyShowtime = ({ movie }) => {
    return (
        <StyledMovieItemDailyShowtime>
            <div className="movie-item">
                <Link to={`/movie/${movie.id}`}>
                    <img src={movie.poster_path_w185} alt={movie.title}  />
                </Link>
                <div className="movie-info">
                    <h2><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h2>
                    <p>Reżyser: {movie.director}</p>
                    <p>Aktorzy: {movie.actors}</p>
                    <p>Gatunek: {movie.genre}</p>
                </div>
            </div>
        </StyledMovieItemDailyShowtime>
    );
}

export default MovieItemForDailyShowtime;