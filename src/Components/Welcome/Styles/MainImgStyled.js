import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  display: flex;
  max-width: var(--container-size);
  margin: 0 auto;
  width: 100%;
  align-items: flex-end;

  @media screen and (max-width: 740px) {
    flex-direction: column;
    align-items: center;
  }
`;

/* Section's left side Container */
export const LeftSide = styled.form`
  width: 40%;

  /* Button Divider - (--OR--) */
  .button-divider {
    width: 100%;
    text-align: center;
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    align-items: center;
    color: var(--dark-gray);
    margin: 2rem 0;
    letter-spacing: 1px;
    font-size: 18px;

    /* Divider Lines */
    &::after,
    &::before {
      content: "";
      background-color: var(--dark-gray);
      height: 1px;
    }
  }

  @media screen and (max-width: 740px) {
    width: 100%;
    margin-bottom: 3rem;
  }
`;

/* Section's Right side Container */
export const RightSide = styled.div`
  width: 60%;
  margin-left: 5%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 1027px) {
    height: 590px;
  }

  @media screen and (max-width: 740px) {
    width: 90%;
    height: fit-content;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

// Section Heading (Left Side)
export const SectionHeading = styled.h2`
  font-weight: 200;
  font-size: 3.5rem;
  font-family: var(--open-sans-font);
  color: var(--brown-color);
  margin-bottom: 2rem;

  @media screen and (max-width: 1190px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 1027px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 890px) {
    font-size: 2rem;
  }
`;

// Input-box Container
export const InputDiv = styled.div`
  input {
    border: 1px solid;
    background: white;
    width: 100%;
    height: 60%;
    border-radius: 5px;
    padding: 1.2rem 1rem;
    font-size: 18px;
    color: var(--dark-gray);
    margin-bottom: 0.7rem;
    background-color: white;
  }
  input:focus {
    outline: none;
  }

  /* error occured input fields */
  input.wrong {
    background-color: #ff000033;
  }

  /* Password Input Container */
  .pass-container {
    position: relative;

    /* pass input-field */
    input {
      padding-right: 65px;
    }

    /* Show/Hide Button */
    strong {
      user-select: none;
      position: absolute;
      right: 20px;
      top: 30%;
      background: transparent;
      border: none;
      font-size: 15px;
      font-weight: 600;
      text-transform: capitalize;
      color: var(--dark-gray);
      letter-spacing: 1px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  /* Form-error text */
  .error {
    color: red;
    font-size: 15px;
    margin-bottom: -0.6rem;
  }

  /* Forget-Pass */
  p {
    font-size: 1.2rem;
    margin-top: 0.5rem;
    letter-spacing: 0.8px;
  }

  @media screen and (max-width: 890px) {
    /* Both Input Box */
    input {
      padding: 1rem 1rem;
      font-size: 16px;
    }

    /* Forget-Pass */
    p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 360px) {
    input,
    p {
      font-size: 14px;
    }
  }
`;

// Button Tempelate - Left Side
const button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--quick-transition);
  letter-spacing: 1.5px;
  padding: 1rem;
  line-height: 1.3;
  border-radius: 30px;
  font-size: 20px;

  img {
    height: 25px;
    margin-right: 25px;
  }

  &:hover {
    background-color: var(--light-white);
  }

  @media screen and (max-width: 890px) {
    font-size: 1rem;
    img {
      height: 22px;
      margin-right: 17px;
    }
  }

  @media screen and (max-width: 740px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 360px) {
    font-size: 16px;
  }
`;

// SignUp Button
export const SingUp = styled(button)`
  margin-top: 2rem;
  background: var(--primary-color);
  color: white;

  &:hover {
    background: var(--light-primary-color);
  }
`;

// Sign-In-With-Google Button
export const SignInGoogle = styled(button)`
  border: 1px solid var(--dark-gray);
  color: var(--dark-gray);
`;
