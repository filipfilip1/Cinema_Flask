import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReservationProvider } from "./context/ReservationContext";

import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import HomePage from './components/HomePage/HomePage';
import ShowtimesPage from './components/Showtimes/ShowtimesPage';
import SelectSeatsPage from './components/SelectSeatsPage/SelectSeatsPage';
import ConfirmReservationPage from './components/ConfirmReservationPage/ConfirmReservationPage';
import ReservationDetails from "./components/ReservationDetails/ReservationDetails";
import MovieItemDetails from "./components/MovieItemDetails/MovieItemDetails";
import Repertoire from "./components/HomePage/Repertoire";

import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles/>
      <ReservationProvider>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showtimes/:cinemaId" element={<ShowtimesPage />} />
          <Route path="/select_seat/:showtimeId" element={<SelectSeatsPage />} />
          <Route path="/confirm_reservation/:showtimeId" element={<ConfirmReservationPage />} />
          <Route path="/reservation_details/:reservationId" element={<ReservationDetails />} />
          <Route path="/movie/:movieId" element={<MovieItemDetails />} />
          <Route path="/repertoire" element={<Repertoire />} />
        </Routes>
      </ReservationProvider>
    </Router>
  );
}

export default App;
