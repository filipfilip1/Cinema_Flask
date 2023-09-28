import styled from "styled-components";
import { Link } from 'react-router-dom';

export const StyledMovieShowtimeContainer = styled.div`
    display: flex;
    width: 80%;
    margin-left: 20%;
`;

export const StyledShowtimeList = styled.div`
    flex: 30%;
    display: flex;
    flex-direction: column;
    height: 25%;
`;

export const StyledShowtimeCard = styled.div`
    width: 10vw;
    height: 90px;
    padding: 10px;
    margin-top: 20px;
    line-height: 16px;
    background-color: #f3f4f6;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

export const StyledBuyTicketLink = styled(Link)`
    padding: 5px 20px;
    text-decoration: none;
    border-radius: 5px;
    background-color: #B3AC94;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FF6F4A;
    }

`;
