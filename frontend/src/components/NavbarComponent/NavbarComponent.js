import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { StyledNavbar } from './NavbarComponent.styles';

function CustomNavbar() {
    return (
        <StyledNavbar expand="lg">
            <Nav className="ml-auto">
                <LinkContainer to="/">
                    <Nav.Link>Strona główna</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/repertoire">
                    <Nav.Link>Repertuar</Nav.Link>
                </LinkContainer>
            </Nav>
        </StyledNavbar>
    );
}

export default CustomNavbar;
