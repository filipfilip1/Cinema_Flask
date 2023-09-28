import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
    background-color: #8287B3; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 50px;
  
    .nav-link {
        color: white; 
        padding: 10px 25px;
        border-bottom: 1px solid whitesmoke;
        border-radius: 15%;
        margin: 0 15px;
        &:hover {
            color: #000; 
        }
    }
`;
