import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #00000091;
  z-index: 20;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2.5rem;
`;

export const Form = styled.div`
  background: white;
  border-radius: 10px;
  min-width: 310px;
  width: 90%;
  max-width: 550px;

  @media screen and (max-width: 330px) {
    min-width: unset;
    width: 98%;
  }

  hr {
    border-color: var(--dark-white);
  }

  .img-previewer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem 0.5rem;
    margin-bottom: 1rem;
    max-height: 190px;
    overflow-y: scroll;
    padding-top: 15px;
    padding-right: 4px;
    scroll-behavior: smooth;

    @media screen and (max-width: 640px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 330px) {
      grid-template-columns: 1fr;
    }

    .prev {
      position: relative;

      img {
        object-fit: cover;
        height: 140px;
        width: 100%;

        @media screen and (max-width: 330px) {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }

      button {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.2rem;
        color: red;
        background: black;
        border-radius: 50%;
        padding: 3px 8px;
        transform: translateY(-50%);
        outline: 2px solid white;
        cursor: pointer;

        &:hover {
          background-color: var(--blackish-gray);
        }
      }
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--like-color);
      border-radius: 30px;
    }
  }

  .error {
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
    padding: 0 1.2rem;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  align-items: center;

  .heading {
    font-weight: 100;
    color: var(--blackish-gray);
    letter-spacing: 0.6px;

    @media screen and (max-width: 330px) {
      font-size: 17px;
    }
  }

  button {
    font-size: 1.7rem;
    color: var(--dark-gray);
    cursor: pointer;

    @media screen and (max-width: 330px) {
      font-size: 19px;
    }
  }
`;

export const Body = styled.div`
  padding: 1.2rem 1.2rem 0.4rem;
  display: flex;
  flex-direction: column;
  max-height: 40vh;

  textarea.text-area {
    font-size: 16px;
    border: none;
    height: fit-content;
    margin-bottom: 1rem;
    resize: none;

    @media screen and (max-width: 330px) {
      font-size: 15px;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--like-color);
      border-radius: 30px;
    }
  }

  button.add-tag {
    margin-top: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: var(--primary-color);
    word-spacing: 1px;
    transition: var(--quick-transition);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    @media screen and (max-width: 330px) {
      font-size: 15px;
    }

    &:hover {
      background: #0a66c226;
    }
  }

  @media screen and (max-width: 430px) {
    .profile {
      display: none;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  height: fit-content;

  img {
    margin-right: 15px;
    width: 60px;
    border-radius: 50%;
  }

  .info {
    .name {
      font-weight: bold;
      color: var(--ligth-black);
    }
  }
`;

export const Dropbox = styled.div`
  display: flex;
  align-items: flex-end;
  border: 1px solid var(--blackish-gray);
  border-radius: 40px;
  padding: 4px 11px;
  margin-top: 5px;
  width: fit-content;

  i {
    font-size: 15px;
    color: var(--blackish-gray);
  }

  i.down {
    font-size: 17px;
  }

  span {
    font-size: 14px;
    margin-left: 5px;
    font-weight: bold;
    color: var(--blackish-gray);
    margin-right: 7px;
  }
`;

export const Foot = styled.div`
  padding: 0.2rem 1.2rem 1.2rem;
  display: flex;
  position: relative;
  align-items: center;

  i.icon {
    font-size: 22px;
    color: var(--dark-gray);
    margin-right: 15px;
    cursor: pointer;

    &:hover {
      color: var(--blackish-gray);
    }
  }

  .divider {
    height: 22px;
    border-left: 1px solid var(--dark-gray);
    margin-right: 20px;
  }

  button.visibility {
    font-size: 15px;
    color: var(--ligth-black);
    font-weight: bold;
    margin-right: 20px;

    i {
      margin-right: 4px;
    }
    span {
      color: var(--blackish-gray);
    }
  }

  button.post {
    margin-left: auto;
    font-size: 16px;
    font-weight: bold;
    color: var(--dark-gray);
    background: var(--light-gray);
    padding: 7px 15px;
    border-radius: 40px;

    img {
      height: 20px;
    }
  }

  button.active {
    color: white;
    background: var(--primary-color);
    cursor: pointer;
  }
`;
