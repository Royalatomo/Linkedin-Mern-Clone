import styled from "styled-components";
import Slider from "react-slick";

// Main Holding Div
export const Container = styled.div`
  padding: 10rem 0 8rem;

  @media screen and (max-width: 750px) {
    padding-top: 5rem;
  }
`;

// Review Slider
export const Carosel = styled(Slider)`
  max-width: var(--container-size);
  margin: 0 auto;
  position: relative;

  /* Slider Buttons */
  & > button {
    position: absolute;
    opacity: 1;
    height: 100%;
    width: 5vw;
    z-index: 1;
    display: block;
    height: fit-content;
    width: fit-content;

    &::before {
      font-size: 3rem;
      color: var(--dark-gray);
      /* color: #979797; */
    }
    &:hover {
      opacity: 1;
    }
  }

  /* Back Button */
  .slick-prev {
    top: -40px;
    left: initial;
    right: 90px;
  }

  /* Next Button */
  .slick-next {
    top: -40px;
    right: 0;
  }

  /* Progress Bar */
  .slick-dots {
    bottom: -55px;
  }

  /* Non-active progress bar dots */
  ul li button {
    &::before {
      font-size: 1rem;
      color: gray;
    }
  }

  /* active progress bar dot */
  li.slick-active button::before {
    color: var(--blackish-gray);
  }

  @media screen and (max-width: 750px) {
    padding-top: 5rem;

    /* Progress Bar */
    .slick-dots {
      bottom: -40px;
    }

    .slick-prev,
    .slick-next {
      top: 0px;
    }
  }
`;

// Single Review Container
export const ReviewContainer = styled.div`
  display: flex !important;
  align-items: center;

  @media screen and (max-width: 750px) {
    flex-direction: column-reverse;
  }
`;

// Review's Text Container
export const TextContainer = styled.div`
  width: 45%;
  margin-right: 10%;
  line-height: 1.3;
  font-family: var(--open-sans-font);
  letter-spacing: 1px;

  @media screen and (max-width: 750px) {
    margin: 0 auto;
    width: 60%;
  }

  @media screen and (max-width: 700px) {
    width: 80%;
  }

  @media screen and (max-width: 420px) {
    width: 90%;
  }
`;

// Review's Title
export const Title = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--brown-color);

  @media screen and (max-width: 940px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

// Review's Content
export const Content = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;

  @media screen and (max-width: 940px) {
    font-size: 1rem;
  }
`;

// Review's Image
export const Image = styled.img`
  width: 35%;
  min-width: 337px;
  object-fit: contain;

  @media screen and (max-width: 750px) {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 420px) {
    width: 90%;
    min-width: initial;
  }
`;
