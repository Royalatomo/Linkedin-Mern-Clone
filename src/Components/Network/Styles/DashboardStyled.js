import styled from "styled-components";

export const ReqContainer = styled.div`
  background-color: white;
  padding-top: 1rem;
  box-shadow: 0 0 2px var(--dark-gray);
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const ReqTitle = styled.h2`
  font-weight: 100;
  padding: 0 2rem;
  font-size: 20px;
  letter-spacing: 1px;
  text-align: center;
  color: var(--blackish-gray);

  span {
    font-weight: 600;
  }
`;

export const Requests = styled.div`
  padding: 1.5rem 0 1rem;

  hr {
    border-color: #d8d8d852;
    margin: 0.5rem 0;
  }

  .show-all-btn {
    width: 100%;
    font-size: 1rem;
    background: var(--light-gray);
    color: gray;
    font-weight: bold;
    padding: 10px 0;
    transform: translateY(1rem);
    cursor: pointer;
    transition: var(--slow-transition);

    &:hover {
      color: white;
      background-color: var(--dark-gray);
    }
  }
`;

export const Request = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    background-color: black;
    object-fit: cover;
  }

  .info {
    .name {
      margin-bottom: 3px;
      line-height: 1.3;
    }

    .headline {
      font-size: 15px;
      color: var(--blackish-gray);
      line-height: 1.2;
    }
  }

  .user-info-container {
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 610px) {
    padding: 0 1rem;

    img {
      height: 50px;
      margin-bottom: auto;
    }
  }

  @media screen and (max-width: 330px) {
    img {
      height: 35px;
    }

    .info .name {
      font-size: 15px;
    }

    .info .headline {
      font-size: 14px;
    }
  }
`;

export const ReqButtons = styled.div`
  margin-left: auto;
  min-width: fit-content;

  @media screen and (max-width: 460px) {
    margin-top: 0.5rem;
  }
`;

export const Accept = styled.button`
  font-size: 16px;
  padding: 7px 15px;
  border-radius: 20px;
  color: var(--primary-color);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  i {
    font-size: 1.5rem;
  }

  &:hover {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: white;
  }

  @media screen and (max-width: 610px) {
    &:hover {
      border-color: transparent;
      background: transparent;
      color: var(--primary-color);
    }

    padding: 0px 12px;
  }

  @media screen and (max-width: 330px) {
    i {
      font-size: 1.8rem;
    }
  }
`;

export const Ignore = styled(Accept)`
  color: var(--dark-gray);

  &:hover {
    border-color: var(--dark-gray);
    background: var(--dark-gray);
    color: white;
  }

  @media screen and (max-width: 610px) {
    &:hover {
      border-color: transparent;
      background: transparent;
      color: var(--dark-gray);
    }
  }
`;

export const Remove = styled(Ignore)`
  color: #af0000;
  font-size: 14px;
  padding: 7px 15px;

  i {
    color: #af0000;
  }

  &:hover {
    border-color: var(--love-color);
    background: var(--love-color);
    color: white;
  }

  @media screen and (max-width: 610px) {
    &:hover {
      border-color: transparent;
      background: transparent;
      color: #af0000;
    }
  }
`;
