import React, { useState, useEffect } from 'react';
import { StyledRepertoire } from "./Repertoire.styles";
import axios from 'axios';
import MovieItem from '../MovieItem/MovieItem';

const Repertoire = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('/api/repertuar')
            .then(response => {
                const sorteMovies = response.data.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                })
                setMovies(sorteMovies);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania listy filmów", error);
            });
    }, []);

    return (
        <StyledRepertoire>
            <h1>W repertuarze</h1>
            <div className="movies-container">
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </div>
        </StyledRepertoire>
    );
}
export default Repertoire;
