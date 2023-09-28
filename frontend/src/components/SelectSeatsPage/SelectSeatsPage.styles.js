import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;  // Jeśli chcesz trochę odstępu od krawędzi
`;

export const SeatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const RowNumber = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

export const Seat = styled.div`
  width: 23px;
  height: 23px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;

  &.free:hover {
    background-color: #bfbfbf;
  }

  &.taken {
    background-color: #999;
    cursor: not-allowed;
  }

  &.selected {
    background-color: #4CAF50;
  }
`;

export const SubmitButton = styled.input`
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: #B3AC94;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FF6F4A;
    }
`;

