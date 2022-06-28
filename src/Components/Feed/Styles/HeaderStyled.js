import styled from "styled-components";

// Main Holding Div
export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 3;

  /* Web View --- */
  @media screen and (min-width: 530px) {
    height: 70px;
    background-color: white;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media screen and (max-width: 1160px) {
      justify-content: center;
    }

    @media screen and (max-width: 1136px) {
      padding: 0 1rem;
    }

    @media screen and (max-width: 870px) {
      justify-content: space-evenly;

      /* Button Names */
      span {
        display: none;
      }
    }
  }
`;

// Linkedin-Logo: Web
export const Logo = styled.div`
  margin-right: 1rem;

  img {
    height: 35px;
    border-radius: 5px;
  }

  @media screen and (max-width: 640px) {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

// Search-box Container
export const SearchContainer = styled.div`
  /* Web View --- */
  @media screen and (min-width: 530px) {
    display: flex;

    @media screen and (max-width: 1000px) {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  /* Mob View --- */
  @media screen and (max-width: 529px) {
    background: white;
    display: grid;
    padding: 0.6rem 1rem;
    align-items: center;
    height: 50px;
    grid-template-columns: 1fr 5fr 1fr;
    height: fit-content;

    .profile {
      background: none;
      border: none;
      justify-self: flex-start;

      img {
        height: 35px;
        border-radius: 50%;
      }
    }

    .message {
      border: none;
      background: none;
      font-size: 25px;
      color: var(--dark-gray);
      justify-self: flex-end;
    }

    @media screen and (max-width: 340px) {
      grid-template-columns: 1fr 4fr 1fr;

      .profile .img {
        height: 30px;
      }

      .message {
        font-size: 21px;
      }
    }
  }
`;

// Search-Box
export const SearchBox = styled.div`
  /* Web View --- */
  @media screen and (min-width: 530px) {
    position: relative;

    /* Search Icon */
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-60%);
      left: 10px;
    }

    /* Input Box */
    input {
      border: none;
      background: gainsboro;
      font-size: 18px;
      padding: 0.2rem 0.5rem;
      height: 35px;
      padding-left: 2rem;
      border-radius: 5px;
      background-color: var(--light-white);

      &:focus {
        outline: none;
      }
    }

    /* Seach Icon Text */
    span {
      display: none;
      margin-top: 0.3rem;
      text-transform: capitalize;
      margin-bottom: -0.4rem;
      margin-top: 0.3rem;
      text-transform: capitalize;
      margin-bottom: -0.4rem;
      font-size: 15px;
    }

    @media screen and (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: var(--dark-gray);
      margin-left: 1rem;

      i {
        position: initial;
        transform: translate(0);
        font-size: 20px;
      }

      span {
        display: block;
      }

      input {
        display: none;
      }
    }

    @media screen and (max-width: 870px) {
      span {
        display: none;
      }
    }
  }

  /* Mob View --- */
  @media screen and (max-width: 529px) {
    position: relative;
    height: 90%;
    width: 100%;

    /* Seach Icon */
    i {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 10px;
    }

    /* Input Box */
    input {
      height: 100%;
      display: inline-block;
      width: 100%;
      border: none;
      background: var(--light-white);
      font-size: 17px;
      padding: 0 2rem;
      border-radius: 4px;
    }

    @media screen and (max-width: 340px) {
      input {
        font-size: 15px;
      }
    }
  }
`;

// Nav-menu btn container
export const NavLink = styled.div`
  /* btn container */
  .icon-div {
    color: gray;
  }

  .icon-div.me-btn:hover .dropdown-box {
    z-index: 10;
    display: block;
  }

  .icon-div.me-btn .dropdown-box {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    background: transparent;
    list-style: none;
    transition: var(--quick-transition);
    z-index: 1;
    display: none;

    li, a {
      width: 100px;
      padding: 0.3rem 0;
      font-size: 1rem;
      letter-spacing: 0.5px;
      font-weight: bold;
      color: var(--blackish-gray);
      border: 2px solid var(--blackish-gray);
      border-bottom: 0;
      background-color: white;
      transition: var(--quick-transition);
    }

    .profile {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      
      &:hover{
        color: white;
        background-color: #2c8c00;
      }
    }

    .posts {
      &:hover{
        color: white;
        background-color: var(--primary-color);
      }
    }

    .logout {
      border-bottom: 2px solid var(--blackish-gray);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      &:hover{
        color: white;
        background-color: #ce3434;
      }
    }

    &:hover {
      z-index: 10;
      display: block;
      background: white;
    }
  }
  @media screen and (min-width: 530px) {
    display: flex;
    height: 100%;

    .icon-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      height: 100%;
      border: none;
      border-bottom: 2px solid transparent;
      background-color: white;
      transition: var(--quick-transition);

      i {
        font-size: 20px;
      }

      span {
        margin-top: 0.3rem;
        text-transform: capitalize;
        margin-bottom: -0.4rem;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      color: black;
      border-color: black;
    }

    .profile {
      img {
        height: 28px;
        border-radius: 50%;
      }

      span {
        margin-bottom: -1px;
        margin-top: 0;
      }
    }

    .premium {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 100px;
      text-align: center;
      color: var(--brown-color);
      margin-left: 1rem;
    }

    @media screen and (max-width: 640px) {
      .icon-div {
        padding: 0 0.6rem;
      }

      .premium {
        font-size: 13px;
        width: 75px;
        line-height: 1.5;
        margin-left: 0.5rem;
      }
    }

    @media screen and (max-width: 1000px) {
      margin-left: 1rem;
    }
  }

  /* Mob View --- */
  @media screen and (max-width: 529px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    background-color: white;
    padding: 0.7rem 0 0.6rem;
    z-index: 10;
    box-shadow: 0 0 1px black;

    .icon-div {
      display: flex;
      flex-direction: column;
      border: none;
      background-color: transparent;
      align-items: center;

      i {
        font-size: 20px;
      }

      span {
        font-family: var(--open-sans-font);
        font-weight: 600;
        margin-top: 0.5rem;
        text-transform: capitalize;
        font-size: 13px;
      }
    }

    @media screen and (max-width: 340px) {
      .icon-div span {
        display: none;
      }
    }
    /* active btn */
    .active {
      color: black;
      border-color: black;
    }
  }
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: var(--light-gray);
  margin: 0 0.5rem;
`;
