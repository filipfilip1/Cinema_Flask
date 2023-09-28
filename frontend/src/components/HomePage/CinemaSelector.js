import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledButton, StyledSelect } from './CinemaSelector.styles'
import axios from 'axios';

const CinemaSelector = () => {
    const [selectedCinemaId, setSelectedCinemaId] = useState(null);
    const [cities, setCities] = useState([]);
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
        axios.get('/api/cities')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania miast", error);
            });
    }, []);

    const handleCityChange = (event) => {
        const cityId = event.target.value;

        axios.get(`/api/city/${cityId}/cinemas`)
            .then(response => {
                setCinemas(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania kin", error);
            });
    }

    const handleCinemaChange = (event) => {
        setSelectedCinemaId(event.target.value);
    }

    return (
        <StyledContainer>
            <StyledSelect onChange={handleCityChange}>
                <option value="">Wybierz miasto</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </StyledSelect>

            <StyledSelect onChange={handleCinemaChange}>
                <option value="">Wybierz kino</option>
                {cinemas.map(cinema => (
                    <option key={cinema.id} value={cinema.id}>
                        {cinema.name}
                    </option>
                ))}
            </StyledSelect>

            {selectedCinemaId && (
                <Link to={`/showtimes/${selectedCinemaId}`}>
                    <StyledButton variant="primary">Zobacz repertuar</StyledButton>
                </Link>
            )}
        </StyledContainer>
    );
}

export default CinemaSelector;