import styled from "styled-components";
import { ReqContainer } from "./DashboardStyled";

export const Container = styled(ReqContainer)`
  background-color: white;
  box-shadow: 0 0 2px var(--dark-gray);
  border-radius: 8px;

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

export const Title = styled.h2`
  letter-spacing: 1px;
  text-align: center;
  text-transform: capitalize;
  color: var(--primary-color);
  border-bottom: 2px solid;
  width: fit-content;
  margin: 0 auto;
  padding: 0 8px 5px;

  @media screen and (max-width: 350px) {
    font-size: 19px;
  }
`;

export const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 0 2rem;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 350px) {
    padding: 0;
  }
`;

export const Item = styled.div`
  background: #efefef38;
  box-shadow: 0px 0px 2px black;
  border-radius: 10px;
  overflow: hidden;
  max-width: 250px;
  position: relative;
  margin-bottom: 1.5rem;

  & > img {
    width: 100%;
    object-fit: cover;
    height: 80px;
    position: absolute;
    top: 0;
  }

  @media screen and (max-width: 1190px) {
    max-width: 220px;
  }

  @media screen and (max-width: 1080px) {
    max-width: unset;
    width: 90%;
    margin: 0 auto 1.5rem;
  }

  @media screen and (max-width: 350px) {
    margin: 0 auto 1.5rem;
  }
`;

export const Profile = styled.div`
  padding: 40px 0 20px;
  display: grid;
  place-content: center;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    margin: -25px auto 1rem;
    background: black;
    border: 1px solid;
  }
  .user-name {
    font-size: 17px;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .headline {
    text-align: center;
    font-size: 16px;
    color: var(--blackish-gray);
  }

  @media screen and (max-width: 1190px) {
    .user-name {
      font-size: 16px;
    }
    .headline {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 1080px) {
    .user-name {
      font-size: 17px;
    }
    .headline {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 350px) {
    img {
      width: 80px;
    }

    .user-name {
      font-size: 15px;
    }
    .headline {
      font-size: 14px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 1rem;

  .active-follow {
    border-color: #9b0a0a;
    background: #d23636c9;
    color: white;
  }

  .active-connect {
    background: #298300;
    color: white;
  }

  @media screen and (max-width: 1190px) {
    flex-direction: column;
  }

  @media screen and (max-width: 1080px) {
    flex-direction: row;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }

  @media screen and (max-width: 580px) {
    flex-direction: row;
  }

  @media screen and (max-width: 350px) {
    flex-direction: column;
  }
`;

export const Follow = styled.button`
  font-size: 14px;
  border: 2px solid var(--primary-color);
  padding: 6px 15px;
  border-radius: 20px;
  background: #007eff36;
  color: var(--primary-color);
  font-weight: 700;
  cursor: pointer;
  transition: var(--slow-transition);
  width: 48%;

  @media screen and (max-width: 1190px) {
    width: 100%;
    padding: 9px 15px;
  }

  @media screen and (max-width: 1080px) {
    width: 48%;
    padding: 6px 15px;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 9px 15px;
  }

  @media screen and (max-width: 580px) {
    width: 48%;
    padding: 6px 15px;
  }

  @media screen and (max-width: 350px) {
    width: 100%;
    padding: 9px 15px;
  }
`;

export const Connect = styled(Follow)`
  border-color: #298300;
  background: #29830021;
  color: #298300;

  @media screen and (max-width: 1190px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 1080px) {
    margin-top: 0;
  }

  @media screen and (max-width: 900px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 580px) {
    margin-top: 0;
  }

  @media screen and (max-width: 350px) {
    margin-top: 1rem;
  }
`;
