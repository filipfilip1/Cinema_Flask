import React, { useState, useEffect, useContext } from 'react';
import { ReservationContext } from "../../context/ReservationContext";
import GenerateTicket from "../GenerateTicket/GenerateTicket";
import { ReservationDetailsContainer, TicketContainer, StyledHeader, StyledParagraph} from "./ReservationDetails.styles";

function ReservationDetails() {
    const {
        showtime: contextShowtime,
        clientName: contextClientName,
        selectedSeats: contextSelectedSeats,
        resetReservationContext
    } = useContext(ReservationContext);

    const [showtime] = useState(contextShowtime);
    const [clientName] = useState(contextClientName);
    const [selectedSeats] = useState(contextSelectedSeats);

    useEffect(() => {
        resetReservationContext();
    }, []);

    if (!showtime) {
        return <p>Wczytywanie informacji o rezerwacji...</p>;
    }

    return (
        <ReservationDetailsContainer>
            <StyledHeader>Szczegóły rezerwacji</StyledHeader>
            <StyledParagraph>Imię klienta: {clientName}</StyledParagraph>
            <StyledParagraph>Film: {showtime.title}</StyledParagraph>
        <StyledParagraph>Data: {showtime.formattedDate}</StyledParagraph>
            <StyledParagraph>Godzina: {showtime.formattedTime}</StyledParagraph>
            <StyledParagraph>Sala: {showtime.hall_name}</StyledParagraph>

            {selectedSeats.map((seat) => (
                <TicketContainer key={seat.id}>
                    <StyledParagraph>Numer rzędu: {seat.seat_row}</StyledParagraph>
                    <StyledParagraph>Numer kolumny: {seat.seat_column}</StyledParagraph>
                </TicketContainer>
            ))}
        <GenerateTicket
            clientName={clientName}
            showtime={showtime}
            selectedSeats={selectedSeats}
        />
    </ReservationDetailsContainer>
);
}

export default ReservationDetails;
