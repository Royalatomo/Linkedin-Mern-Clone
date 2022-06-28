import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  display: flex;
  position: relative;
`;

// White Area
export const WhiteArea = styled.div`
  width: 30%;

  @media screen and (max-width: 800px) {
    width: 0;
  }
`;

// Dark Area
export const ColoredArea = styled.div`
  width: 70%;
  background: var(--light-white);
  padding: 10rem 0;
  display: flex;
  align-items: center;
  height: 600px;
  justify-content: center;

  /* Youtube Video */
  iframe {
    margin-left: -20rem;
    margin-right: 3rem;
  }

  @media screen and (max-width: 1100px) {
    iframe {
      margin-left: -10rem;
      margin-right: 3rem;
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;

    iframe {
      margin: 0;
      margin-bottom: 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 490px) {
    height: 440px;
    margin-bottom: 0rem;
    padding: initial;

    iframe {
      margin-bottom: 0rem;
    }
  }

  @media screen and (max-width: 390px) {
    iframe {
      height: 50%;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  letter-spacing: 2px;
  margin: 0 1rem 1rem;
  font-family: var(--open-sans-font);
  color: var(--light-brown);

  @media screen and (max-width: 800px) {
    position: absolute;
    top: 80%;
  }

  @media screen and (max-width: 520px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 490px) {
    font-size: 1.5rem;
    bottom: 0;
    position: absolute;
    top: initial;
  }
`;
