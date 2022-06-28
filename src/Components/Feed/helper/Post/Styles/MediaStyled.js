import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  position: relative;
  box-shadow: 0 0 2px;

  /* if only one image present */
  .img-container-one {
    grid-template-columns: 1fr;
  }

  /* if only three image present */
  .img-container-three {
    grid-template-columns: unset;
    grid-template-areas:
      "one two"
      "three three";
  }
`;

// Image Container
export const MediaHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.2rem;
  grid-row-gap: 0.2rem;

  /* Images */
  img {
    width: 100%;
    cursor: pointer;
    height: 100%;
    object-fit: cover;
    max-height: 280px;
    min-height: 190px;
  }

  /* More-Image Div */
  .more-img {
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    opacity: 0;
    cursor: pointer;
    color: white;
    font-size: 2.5rem;
    height: 50%;
    width: 50%;
  }

  @media screen and (max-width: 530px){
    img {
      min-height: 150px;
    }
  }

  @media screen and (max-width: 400px){
    img {
      min-height: 120px;
    }
  }
`;
