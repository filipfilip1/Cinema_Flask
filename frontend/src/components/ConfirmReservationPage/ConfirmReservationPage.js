import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReservationContext } from "../../context/ReservationContext";
import { ContainerConfrimReservation, TicketInfo, StyledLabel, StyledInput, SubmitButton } from "./ConfirmReservationPage.styles";


function ConfirmReservation() {
    const { showtime, clientName, selectedSeats, setClientName } = useContext(ReservationContext);
    const navigate = useNavigate();

    const handleConfirm = (e) => {
        e.preventDefault();
        axios.post(`/api/ticket_reservation/${showtime.id}/confirm_reservation`, {
            client_name: clientName,
            seat_ids: selectedSeats.map(seat => seat.id)
        })
        .then(response => {
            const ticketReservationId = response.data.ticket_reservation_id
            navigate(`/reservation_details/${ticketReservationId}`);
        })
        .catch(error => {
            console.error("Błąd podczas wysyłania rezerwacji na serwer", error);
        });
    }

    const handleNameChange = (e) => {
        setClientName(e.target.value);
    };

return (
    <ContainerConfrimReservation>
        <h1>Informacje o rezerwacji</h1>
        <p>Film: {showtime?.title}</p>
        <p>Data: {showtime?.formattedDate}</p>
        <p>Godzina: {showtime?.formattedTime}</p>
        <p>Sala: {showtime?.hall_name}</p>

        <form onSubmit={handleConfirm}>
            <StyledLabel>
                Imię:
            <StyledInput
                type="text"
                value={clientName}
                onChange={handleNameChange}
                placeholder="Wprowadź swoje imię"
                required
                minLength="3"
            />
            </StyledLabel>

            {selectedSeats.map((selectedSeat) => (
                <TicketInfo key={selectedSeat.id}>
                    <p>Numer rzędu: {selectedSeat.seat_row}</p>
                    <p>Numer kolumny: {selectedSeat.seat_column}</p>
                </TicketInfo>
            ))}

            <SubmitButton type="submit">Potwierdź rezerwację</SubmitButton>
        </form>

    </ContainerConfrimReservation>
);
}

export default ConfirmReservation;
