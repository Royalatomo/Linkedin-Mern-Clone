import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  background-color: white;
  padding: 1rem 2rem 0.4rem;
  border-radius: 15px;
  box-shadow: 0 0 2px black;
  overflow: hidden;
  margin-bottom: 2rem;
`;

// Profile & InputBox - Container
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

// User Profile Container
export const Profile = styled.div`
  margin-right: 1rem;

  // profile image
  img {
    height: 50px;
    border-radius: 50%;
  }

  @media screen and (max-width: 1090px) {
    img {
      height: 40px;
    }
  }

  @media screen and (max-width: 991px) {
    img {
      height: 50px;
    }
  }
`;

// Input Box
export const InputBox = styled.div`
  font-size: 15px;
  background: white;
  padding: 0.8rem 1.1rem;
  border-radius: 30px;
  border: 1px solid var(--dark-gray);
  box-shadow: var(--light-shadow) var(--light-gray);
  width: 100%;
  font-weight: 600;
  transition: all 167ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Text */
  p {
    color: var(--dark-gray);
  }

  &:hover {
    background-color: var(--light-white);
    cursor: pointer;
  }

  @media screen and (max-width: 1090px) {
    font-size: 14px;
    padding: 0.75rem 1rem;
  }

  @media screen and (max-width: 991px) {
    font-size: 15px;
    padding: 0.8rem 1.1rem;
  }
`;

// Buttons Container
export const CreateContainer = styled.div`
  margin-top: 0.4rem;
  background: white;
  display: flex;
  justify-content: space-between;
`;

// Individual Post Buttons
export const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: gray;
  padding: 0.5rem;
  border-radius: 6px;
  transition: var(--quick-transition);

  /* Button Image */
  img {
    height: 25px;
    margin-right: 0.3rem;
  }

  &:hover {
    background-color: var(--light-white);
    cursor: pointer;
  }

  @media screen and (max-width: 1090px) {
    font-size: 13px;
  }

  @media screen and (max-width: 991px) {
    font-size: 14px;
  }
`;
