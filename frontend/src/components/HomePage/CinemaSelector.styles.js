import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #8287B3;  
`;

export const StyledSelect = styled.select`
    padding: 10px 15px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #FEFAEB;
`;

export const StyledButton = styled(Button)`
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 5px;
    transition: transform 0.3s ease;
    background-color: #EDEFFF;

    &:hover {
        transform: scale(1.05);
    }
`;