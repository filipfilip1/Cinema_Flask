import React from 'react';
import MovieItemDailyShowtime from "./MovieItemDailyShowtime";
import { StyledMovieShowtimeContainer, StyledShowtimeList, StyledShowtimeCard, StyledBuyTicketLink } from "./DailyShowtimes.styles";
import { formatDateTime } from "../../helpers";

function DailyShowtimes({ showtimes, selectedDate }) {

    const aggregateShowtimesByMovie = (showtimesData) => {
        const aggregatedMovies = {};

        showtimesData.forEach(showtime => {
            const movieId = showtime.movie_id;
            if (!aggregatedMovies[movieId]) {
                aggregatedMovies[movieId] = {

                    movie: {
                        id: movieId,
                        title: showtime.title,
                        poster_path_w185: showtime.poster_path_w185,
                        director: showtime.director,
                        actors: showtime.actors,
                        genre: showtime.genre,

                    },
                    showtimes: [],
                };
            }

            const { date, time } = formatDateTime(showtime.start_time);

            aggregatedMovies[movieId].showtimes.push({
                id: showtime.id,
                startTime: time,
                startDate: date,
                hallName: showtime.hall_name,
            });
        });

    return Object.values(aggregatedMovies);
    };



    const filterShowtimesByDate = (showtimesData, date) => {
        return showtimesData.filter(showtime => {
            const showtimeDate = new Date(showtime.start_time).toDateString();
            return showtimeDate === date.toDateString();
        });
    };

    const futureShowtimes = showtimes.filter(showtime => new Date(showtime.start_time) > new Date());
    const filteredShowtimes = filterShowtimesByDate(futureShowtimes, selectedDate);
    const aggregatedShowtimes = aggregateShowtimesByMovie(filteredShowtimes);
    const sortedAggregatedShowtimes = aggregatedShowtimes.sort((a, b) => {
        return a.movie.title.localeCompare(b.movie.title);
    })


    return (
        <div>
            <h2 style={{ marginLeft: '20%'}}>Repertuar na {selectedDate.toDateString().slice(4)}:</h2>

            {sortedAggregatedShowtimes.map((movieWithShowtime) => (
                <StyledMovieShowtimeContainer key={movieWithShowtime.movie.title}>
                    <MovieItemDailyShowtime movie={movieWithShowtime.movie} />

                    <StyledShowtimeList>
                        {movieWithShowtime.showtimes.map((showtime) => (
                            <StyledShowtimeCard key={showtime.id}>
                                <p>{showtime.startDate} - {showtime.startTime}</p>
                                <p>Sala: {showtime.hallName}</p>
                                <StyledBuyTicketLink to={`/select_seat/${showtime.id}`}>
                                    Kup Bilet
                                </StyledBuyTicketLink>
                            </StyledShowtimeCard>
                        ))}
                    </StyledShowtimeList>
                </StyledMovieShowtimeContainer>
            ))}
        </div>
    );
}

export default DailyShowtimes;