import styled from "styled-components";

// Button Container
export const ActionBtn = styled.div`
  position: relative;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  cursor: pointer;
  color: var(--blackish-gray);
  text-transform: capitalize;

  /* Reaction Emoji */
  i {
    font-size: 24px;
  }

  /* Reaction Emoji */
  img {
    height: 27px;
  }

  /* Reaction Text */
  span {
    font-size: 14px;
    font-weight: 600;
    margin-left: 7px;

    @media screen and (max-width: 415px) {
      display: none;
    }
  }

  /* Hover reaction options container */
  .show-options-active {
    z-index: 2;
    opacity: 1;
  }

  &:hover {
    background-color: var(--light-white);
  }

  /* Like Button */
  .like-btn {
    &:hover {
      background-color: white;
    }
  }
`;

// Reaction Hover Emoji Option
export const LikeOptions = styled.div`
  background: white;
  display: flex;
  align-items: center;
  position: absolute;
  top: -40px;
  left: -33px;
  opacity: 0;
  z-index: -1;
  padding: 0.5rem;
  border-radius: 30px;
  box-shadow: -2px 1px 10px grey;
  transition: opacity 0.2s linear;

  /* Options */
  i,
  img {
    margin: 0 2px;
    padding: 4px 5px;
    border-radius: 5px;
    height: 30px;

    &:hover {
      background: var(--light-white);
    }
  }

  @media screen and (max-width: 1115px) {
    left: -20px;
  }
  @media screen and (max-width: 1025px) {
    left: -10px;
  }
  @media screen and (max-width: 495px) {
    left: -5px;
  }
`;
