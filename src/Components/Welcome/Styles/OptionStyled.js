import styled from "styled-components";
import { Link } from "react-router-dom";

// Main Holding Div
export const Container = styled.div`
  max-width: var(--container-size);
  margin: 0 auto;
  display: flex;
  padding: 3rem 0;

  @media screen and (max-width: 920px) {
    flex-direction: column;
  }
`;

// Section Heading (Left)
export const Heading = styled.h2`
  width: 40%;
  font-family: var(--open-sans-font);
  font-size: 3rem;
  font-weight: 100;
  line-height: 1.5;
  letter-spacing: 1px;

  @media screen and (max-width: 920px) {
    width: 100%;
  }

  @media screen and (max-width: 920px) {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 420px) {
    font-size: 2rem;
  }
`;

// Options Container
export const OptionDiv = styled.div`
  width: 60%;
  margin-left: 5%;

  @media screen and (max-width: 920px) {
    width: 100%;
    margin-left: 0;
  }
`;

// Options Container's Title
export const OptionTitle = styled.h3`
  color: var(--ligth-black);
  font-size: 16px;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 920px) {
    font-size: 14px;
    margin: 1.5rem 0;
  }
`;

// Options Container's Title
export const OptionContainer = styled.div`
  /* option color */
  .blue {
    color: var(--primary-color);

    &:hover {
      background-color: var(--light-white);
      box-shadow: 0 0 1px var(--primary-color);
    }
  }
`;

// Individual Option
export const Option = styled(Link)`
  color: var(--blackish-gray);
  font-size: 16px;
  font-weight: 600;
  border: 1px solid;
  padding: 1rem 1rem;
  display: inline-block;
  margin: 0 0.6rem 0.8rem 0;
  border-radius: 28px;
  transition: var(--slow-transition);

  &:hover {
    background-color: var(--dark-white);
  }

  @media screen and (max-width: 920px) {
    font-size: 14px;
  }
`;

// hide/show button
export const Button = styled.button`
  background-color: transparent;
  border: none;
  display: block;
  font-size: 1rem;
  color: var(--blackish-gray);
  font-weight: 700;
  letter-spacing: 1px;
  padding: 1rem 0.7rem;
  transition: var(--slow-transition);
  cursor: pointer;

  &:hover {
    background-color: var(--light-gray);
    border-radius: 5px;
  }
`;
