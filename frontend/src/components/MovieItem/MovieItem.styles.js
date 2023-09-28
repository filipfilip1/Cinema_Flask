import styled from 'styled-components';

export const StyledMovieItem = styled.div`
    box-sizing: border-box;
    width: 380px;
    padding: 10px 19px;
    margin-bottom: 20px;  
    border-radius: 10px;
    background-color: #B3AC94;  

  
    img {
        width: 342px;
        border-radius: 5px;
    }

    .movie-info {
        padding: 10px 0;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;

            a {
                color: #343a40;  
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        p {
            margin-bottom: 5px;
        }
    }
`;
