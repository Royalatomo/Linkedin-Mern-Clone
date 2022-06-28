import styled from "styled-components";
import { Link } from "react-router-dom";

// Header Container
export const Nav = styled.nav`
  max-width: var(--container-size);
  margin: 0 auto;
  padding: 3rem 3rem 2rem;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  height: 10vh;
  align-items: center;

  /* Logo Container */
  .logo-div {
    img {
      height: 35px;
    }
  }

  @media screen and (min-width: 1300px) {
    padding-left: 0;
    padding-right: 0;
    margin-right: auto;
  }

  @media screen and (max-width: 460px) {
    padding: 3rem 1rem;

    /* Logo */
    .logo-div img {
      height: 21px;
    }
  }

  @media screen and (max-width: 340px) {
    padding: 2rem 1rem;
    flex-direction: column;
    margin-bottom: 4rem;

    /* Logo Container */
    .logo-div {
      margin-bottom: 1rem;
    }
  }
`;


export const NavLink = styled.div`
  display: flex;
  align-items: center;

  /* Nav Icon Container */
  .icon-div {
    color: var(--dark-gray);
    text-align: center;
    margin: 0 1.5rem;

    /* Nav Icon */
    i {
      display: block;
      margin-bottom: 0.2rem;
      font-size: 1.2rem;
    }

    /* Nav Icon Text */
    span {
      text-transform: capitalize;
    }

    &:hover {
      color: black;
    }
  }

  /* Option Divider */
  .divider {
    border-left: 1px solid var(--light-gray);
    height: 30px;
    margin: 0 0.5rem;
  }

  @media screen and (max-width: 890px) {
    /* Nav Icon Container */
    .icon-div {
      margin: 0 1rem;
    }
  }

  @media screen and (max-width: 790px) {
    .icon-div,
    .divider {
      display: none;
    }
  }
`;

// Header Button Template (Join-now, Sing-in)
const Button = styled(Link)`
  transition: all 0.1s linear;
  color: var(--primary-color);
  font-weight: bold;
  text-align: center;
  padding: 0.6rem;
`;

// Join-Now Button
export const Register = styled(Button)`
  color: var(--dark-gray);
  margin-right: 0.3rem;
  min-width: 90px;

  &:hover {
    background-color: var(--dark-white);
    border-radius: 5px;
  }

  @media screen and (max-width: 460px) {
    margin-right: 0.3rem;
  }
`;

// Sing-in Button
export const Login = styled(Button)`
  border: 1px solid;
  padding: inherit 1rem;
  margin: 0 0.5rem;
  border-radius: 20px;
  letter-spacing: 1px;
  width: 100px;
  transition: background-color, box-shadow;
  transition-duration: 167ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

  &:hover {
    border: 2px solid;
    background-color: var(--light-white);
    box-shadow: 0 0 1px var(--primary-color);
  }

  @media screen and (max-width: 460px) {
    letter-spacing: 0.6px;
    width: 94px;
    font-size: 15px;
  }
`;