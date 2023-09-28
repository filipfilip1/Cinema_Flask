import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ReservationContext } from "../../context/ReservationContext";
import { formatDateTime } from "../../helpers";
import axios from 'axios';
import { MainContainer, SeatRow, Seat, RowNumber, SubmitButton } from "./SelectSeatsPage.styles";

function SelectSeatsPage() {
  const { showtimeId} = useParams();
  const navigate = useNavigate();
  const [allSeats, setAllSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([])

  const {
    selectedSeats, setSelectedSeats, showtime, setShowtime
  } = useContext(ReservationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/confirm_reservation/${showtimeId}`)
  };



  useEffect(() => {
    axios.get(`/api/select_seats/${showtimeId}`)
        .then(response => {
          setAllSeats(response.data.all_seats);
          setTakenSeats(response.data.taken_seats.map(seat => seat.id));

          return axios.get(`/api/showtimes/${showtimeId}`);
        })
        .then(response => {
          setShowtime(response.data);
            const showtimeData = response.data;
            const { date, time } = formatDateTime(showtimeData.start_time);
            showtimeData.formattedDate = date;
            showtimeData.formattedTime = time;
            setShowtime(showtimeData);
        })
        .catch(error => {
          console.log("Błąd przy pobieraniu danych", error)
        })
  }, [showtimeId]);

  const handleSeatClick = (seat) => {
    if (takenSeats.includes(seat.id)) return;
    setSelectedSeats((prevSelectedSeats) => {
        const isSeatSelected  = prevSelectedSeats.some(seatSelected => seatSelected.id === seat.id);
        if (isSeatSelected) {
            return prevSelectedSeats.filter(seatSelected => seatSelected.id !== seat.id);
        } else {
            return [...prevSelectedSeats, seat];
        }
    });
  };

  const renderSeats = () => {
    const rows = [];

    allSeats.forEach((seat) => {
      if (!rows[seat.seat_row]) {
        rows[seat.seat_row] = [];
      }
      rows[seat.seat_row].push(seat);
    });

    return rows.map((row, rowIndex) => (
      <SeatRow key={rowIndex}>
        <RowNumber>Rząd {rowIndex - 1}</RowNumber>
        {row.map((seat) => {
          const isSeatSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id);
          return (
            <Seat
              key={seat.id}
              className={`${takenSeats.includes(seat.id) ? 'taken' : 'free'} ${isSeatSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.seat_column}
            </Seat>
          );
        })}
      </SeatRow>
    ));
  };

  return (
      <MainContainer>
        <h1>Wybierz Miejsce</h1>
        <h2>
            { showtime ?
                <Link to={`/movie/${showtime.movie_id}`}>
                    {showtime.title} {showtime.formattedDate} {showtime.formattedTime}
                </Link>: "" }
        </h2>
          <form onSubmit={handleSubmit}>
              {renderSeats()}
              <SubmitButton type="submit" value="Przejdź do rezerwacji" disabled={selectedSeats.length === 0} />
          </form>
      </MainContainer>
  );
}

export default SelectSeatsPage;