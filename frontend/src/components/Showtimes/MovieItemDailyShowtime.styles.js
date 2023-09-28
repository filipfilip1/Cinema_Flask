import styled from "styled-components";

export const StyledMovieItemDailyShowtime = styled.div`
    width: 50%;
    height: 200px;
    margin: 20px auto; 
    background-color: #B3AC94;
    padding: 20px;
    border-radius: 10px;

    .movie-item {
        display: flex;
        align-items: center;
    }

    img {
        width: 60%;
        margin-right: 20px;
    }

    .movie-info {
        flex: 1;

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

