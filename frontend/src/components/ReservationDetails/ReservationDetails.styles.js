import styled from 'styled-components';

export const ReservationDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;        
    padding: 20px;
    background-color: #f5f5f5;  
    border-radius: 5px;      
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
    width: 80%;                 
    margin: 20px auto;         
`;

export const StyledHeader = styled.h1`
    color: #333;               
    border-bottom: 2px solid #8287B3;
    border-radius: 15%;
    padding: 5px 15px;
    margin-bottom: 20px;     
`;

export const StyledParagraph = styled.p`
    color: #555;             
    margin: 10px 0;            
    font-size: 1rem;          
`;

export const TicketContainer = styled.div`
    background-color: #EDEFFF;  
    border-radius: 4px;        
    padding: 10px;           
    margin: 10px 0;     
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); 
    width: 70%;                
`;
