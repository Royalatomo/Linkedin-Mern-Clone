import styled from "styled-components";
import { Option } from "./OptionStyled"; // Button Styling

// Main Holding Div
export const Container = styled.div`
  max-width: var(--container-size);
  padding: 6rem 0;
  display: flex;
  margin: 0 auto;
  align-items: flex-start;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

// Individual Item Container
export const ItemContainer = styled.div`
  margin: 0 auto;

  /* Connect - Item Container */
  &:first-child {
    margin-right: 5%;
  }

  @media screen and (max-width: 1020px) {
    /* Connect - Item Container */
    &:first-child {
      margin: 0 auto 2rem;
      margin-right: 5%;
    }
  }
`;

// Item Title
export const Title = styled.h2`
  font-family: var(--open-sans-font);
  font-size: 3rem;
  font-weight: 100;
  letter-spacing: 1px;
  line-height: 1.4;
  word-spacing: 2px;
  max-width: 480px;

  @media screen and (max-width: 1030px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 640px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 540px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 360px) {
    font-size: 1.5rem;
  }
`;

// Item Image Container
export const ImageDiv = styled.div`
  width: 50%;
  min-width: 300px;
  margin-bottom: 1rem;

  @media screen and (max-width: 1020px) {
    min-width: 260px;
  }

  @media screen and (max-width: 640px) {
    width: 80%;
  }
`;

// Connect - Item Button
export const Button = styled(Option)`
  margin-top: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  @media screen and (max-width: 1030px) {
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    font-size: 18px;
  }

  @media screen and (max-width: 540px) {
    font-size: 16px;
  }

  @media screen and (max-width: 360px) {
    font-size: 14px;
  }
`;

// Learn Skill - Item Button
export const DropBox = styled.div`
  border: 1px solid var(--dark-gray);
  width: fit-content;
  display: flex;
  font-size: 18px;
  margin-top: 2rem;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  background: white;
  color: var(--ligth-black);

  i {
    margin-left: 1.5rem;
    color: var(--dark-gray);
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1030px) {
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    font-size: 18px;
  }

  @media screen and (max-width: 540px) {
    font-size: 16px;
    margin-right: 1rem;
  }
`;
