import styled from 'styled-components';

export const StyledRepertoire = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;

    h1 {
        font-size: 2.5rem;
        margin-bottom: 30px;
        color: #343a40;
    }

    div.movies-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;
