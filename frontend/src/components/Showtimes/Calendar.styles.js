
import styled from 'styled-components';

export const StyledCalendarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%; 
    margin: auto 0; 
    
    .highlighted {
      background-color: cadetblue;
    }

    .today-highlighted {
      background-color: yellow;
    }
`;
