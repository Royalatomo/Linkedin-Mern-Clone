import styled from "styled-components";

// Main Holding Container
export const Container = styled.div`
  padding: 0 2rem;
  max-width: 630px;
  margin: 0 auto;
  width: 100%;

  @media screen and (max-width: 991px){
    padding-right: 0;
  }

  @media screen and (max-width: 620px){
    padding: 0;
  }
`;