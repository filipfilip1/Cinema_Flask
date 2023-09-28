import React from 'react';
import { StyledCalendarContainer } from "./Calendar.styles";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Calendar({ showtimes, onDateChange }) {

    const extractUniqueDates = (showtimes) => {
        const uniqueDates = new Set();
        const now = new Date();
        showtimes.forEach(showtime => {
            const showtimeDate = new Date(showtime.start_time);
            if (showtimeDate > now) {
                const date = showtimeDate.toDateString();
                uniqueDates.add(date);
            }
        });
        return [...uniqueDates];
};

    const highlightedDates = extractUniqueDates(showtimes);

    const tileClassName = ({ date }) => {
        const today = new Date().toDateString();
            if (date.toDateString() === today) {
                return 'today-highlighted';
            } else if (highlightedDates.some(highlightedDate => highlightedDate === date.toDateString())) {
                return 'highlighted';
            }
    };


    return (
            <StyledCalendarContainer>
                <ReactCalendar
                    onClickDay={(value) => onDateChange(value)}
                    tileClassName={tileClassName}
                />
            </StyledCalendarContainer>
    );
}

export default Calendar;
