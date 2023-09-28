import styled from 'styled-components';
import { Image} from 'react-bootstrap'

export const MovieDetailsContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto 0 auto;
  display: flex;  
  gap: 20px;
`;

export const StyledImage = styled(Image)`
    max-height: 85vh; 
    object-fit: cover; 
`;


export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
