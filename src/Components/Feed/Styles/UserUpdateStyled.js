import styled from "styled-components";

export const Container = styled.div`
  display: none;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #00000078;
  z-index: 20;
  justify-content: center;
  align-items: center;

  &.visible {
    display: flex;
  }
`;

export const Form = styled.div`
  width: fit-content;
  background: white;
  display: flex;
  flex-direction: column;
  min-width: 35%;
  border-radius: 30px;
  overflow: hidden;
  border: 4px solid var(--blackish-gray);

  .bgImg {
    min-height: 135px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    max-height: 140px;
  }

  .edit {
    border: 0;
    position: absolute;
    padding: 10px;
    border-radius: 50%;
    font-size: 13px;
    color: white;
    width: fit-content;
    background: var(--blackish-gray);
    z-index: 5;
    transition: var(--quick-transition);

    &:hover {
      cursor: pointer;
      background: var(--primary-color);
    }
  }
`;

export const ImgDiv = styled.div`
  position: relative;
  height: fit-content;

  .edit {
    right: 0;
    bottom: 0;
    margin-right: 10px;
    transform: translateY(50%);
  }
`;

export const Profile = styled.div`
  width: 100%;
  text-align: center;
  margin-top: -7rem;
  position: relative;

  img {
    border-radius: 50%;
    width: 95px;
    border: 2px solid black;
    height: 95px;
    object-fit: cover;
    background: black;
  }

  .edit {
    bottom: 0;
    left: 50%;
    transform: translateX(20px);
  }
`;

export const InputDiv = styled.div`
  display: grid;
  margin-bottom: 1.5rem;

  .error {
    font-size: 14px;
    color: red;
    margin-top: 10px;
    letter-spacing: 0.6px;
    font-weight: 600;
  }

  label {
    font-weight: bold;
    margin-right: 10px;
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }

  input {
    min-width: fit-content;
    border: none;
    border: 2px solid var(--like-color);
    border-radius: 5px;
    padding: 0.4rem 0.7rem;
    font-size: 0.9rem;
    width: 100%;
  }

  input.wrong {
    background-color: #ff000033;
  }
`;

export const TxtDiv = styled.div`
  padding: 40px 20px 20px;
`;

export const Save = styled.div`
  width: fit-content;
  font-size: 1rem;
  background: var(--blackish-gray);
  color: white;
  padding: 6px 20px;
  border-radius: 40px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  transition: var(--quick-transition);

  img {
    height: 15px;
    width: 15px;
  }

  &:hover {
    background: var(--primary-color);
  }
`;
