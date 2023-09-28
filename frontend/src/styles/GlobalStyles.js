import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  body {
    font-family: 'Lato', sans-serif;
    background-color: #fefaeb;
    color: #003B4A; 
    margin: 0;
    padding: 0;
  }
  
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit; 
  }
  
`;

export default GlobalStyles;
