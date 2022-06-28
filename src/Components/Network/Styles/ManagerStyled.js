import styled from "styled-components";

export const Container = styled.div`
  background: white;
  box-shadow: 0 0 2px var(--dark-gray);
  border-radius: 8px;
  padding: 1rem 0;
  position: fixed;
  transition: var(--slow-transition);

  @media screen and (max-width: 1290px) {
    left: 20px;
  }

  @media screen and (max-width: 810px) {
    position: fixed;
    width: fit-content;
    bottom: -20px;
    left: 9px;
    transform: translateY(78%);
    z-index: 2;
  }

  @media screen and (max-width: 530px) {
    transform: translateY(49%);
    left: 0px;
  }

  @media screen and (max-width: 340px) {
    transform: translateY(62%);
    bottom: -15px;
  }
`;

export const Title = styled.h2`
  font-size: 17px;
  letter-spacing: 1px;
  color: var(--blackish-gray);
  font-weight: 700;
  margin: 0 2rem;

  i {
    margin-left: 0.5rem;
    color: black;
  }
`;

export const OptionContainer = styled.div`
  margin-top: 1rem;

  .active {
    background-color: var(--dark-white);
    color: black;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0.5rem 2rem;
  text-transform: capitalize;
  color: var(--dark-gray);
  transition: var(--slow-transition);
  cursor: pointer;
  width: 250px;

  i {
    margin-right: 1rem;
    width: 25px;
  }

  .option-count {
    margin-left: auto;
  }

  @media screen and (max-width: 810px) {
    width: 100%;
  }
`;
