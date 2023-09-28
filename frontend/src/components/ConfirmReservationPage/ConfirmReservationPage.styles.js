import styled from "styled-components";

export const ContainerConfrimReservation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const StyledInput = styled.input`
    padding: 10px;
    margin-top: 10px;
    margin-left: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    font-size: 1rem;
    width: 200px;
`;

export const StyledLabel = styled.label`
    font-size: 1.1rem;
    margin: 20px 0;
`;

export const TicketInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin: 10px 0;
    width: 250px;
`;

export const SubmitButton = styled.button`
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #B3AC94;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FF6F4A;
    }
`;
