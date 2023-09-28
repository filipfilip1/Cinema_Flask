import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DailyShowtimes from "./DailyShowtimes";
import Calendar from "./Calendar";



function ShowtimesPage() {
    const { cinemaId } = useParams();
    const [cinema, setCinema] = useState({});
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        axios.get(`/api/cinema/${cinemaId}`)
            .then(response => {
                setCinema(response.data);
            })
            .catch(error => {
                console.log("Błąd przy pobraniu danych kina", error);
            });

        axios.get(`/api/cinema/${cinemaId}/showtimes`)
            .then(response => {
                setShowtimes(response.data);
            })
            .catch(error => {
                console.log("Błąd przy pobieraniu agregowanych seansów", error);
            });
}, [cinemaId, selectedDate]);


    return (
        <div>
            <h1 style={{ marginLeft: '43%'}}>{cinema.name}</h1>
            <Calendar
                showtimes={showtimes}
                onDateChange={setSelectedDate}
            />
            <DailyShowtimes
                showtimes={showtimes}
                selectedDate={selectedDate}
            />
        </div>
    );
}

export default ShowtimesPage;
