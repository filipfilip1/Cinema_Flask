import React, { createContext, useState } from "react";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showtime, setShowtime] = useState(null);
    const [clientName, setClientName] = useState('');

    const resetReservationContext = () => {
        setSelectedSeats([]);
        setShowtime(null);
        setClientName('');
    }

    return (
        <ReservationContext.Provider value={{
            selectedSeats, setSelectedSeats, showtime, setShowtime, clientName, setClientName, resetReservationContext
        }}>
            {children}
        </ReservationContext.Provider>
    );
};