import styled from "styled-components";
import { Head, Body, Foot } from "../helper/Post/Styles/MainStyled";

// Main Holding Div
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000c9;
  display: none;
`;

// ImgViewer Container
export const Holder = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  width: 80%;
  height: 85%;
  margin: auto;
  background: var(--dark-white);
  border-radius: 15px;
  overflow: hidden;

  @media screen and (max-width: 1240px) {
    width: 98%;
    height: 98%;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 760px) {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }
`;

// Image Container (Left Side)
export const ImgViewingArea = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  /* Visible Image */
  .active-img {
    display: block !important;
  }

  /* All Images */
  .img-viewer-item {
    height: 100%;
    width: 100%;
    object-fit: contain;
    display: none;
  }

  /* Next & Prv Btn */
  .left-slide,
  .right-slide {
    position: absolute;
    top: 50%;
    font-size: 2rem;
    background: #ffffff;
    border: 2px solid black;
    padding: 0.5rem 0.8rem;
    border-radius: 50%;
    cursor: pointer;
    transition: var(--quick-transition);
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  /* Disable Btn */
  .disableControl {
    opacity: 0 !important;
    cursor: default !important;
    &:hover {
      opacity: 0 !important;
    }
  }

  .left-slide {
    left: 1rem;
  }

  .right-slide {
    right: 1rem;
  }

  @media screen and (max-width: 760px) {
    .left-slide,
    .right-slide {
      font-size: 1.5rem;
    }
  }

`;

// Text Container (Right Side)
export const InteractionArea = styled.div`
  #like {
    color: var(--like-color);
  }
  #celebrate {
    color: var(--celebrate-color);
  }
  #support {
    color: var(--support-color);
  }
  #love {
    color: var(--love-color);
  }
  #insightful {
    color: var(--insightful-color);
  }
  #curious {
    color: var(--curious-color);
  }

  background: white;
  padding: 1rem 0 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  overflow-y: scroll;

  @media screen and (max-width: 760px) {
    position: initial;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--like-color);
    border-radius: 30px;
  }
`;

export const ViewerHead = styled(Head)`
  .close-btn {
    color: var(--curious-color);
    border-radius: 50%;
    background: #ffdbdb !important;
    padding: 0.5rem 0.7rem;
    box-shadow: 0 0 3px #0000002e;
    position: absolute;
    right: -2px;
    top: -2px;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 760px) {
    .profile-img-container,
    .time-container {
      display: none !important;
    }

    .close-btn {
      right: -5px;
      top: -5px;
    }
  }
`;

export const ViewerBody = styled(Body)`
  min-height: fit-content;

  .others {
    margin: 0 0.5rem;
  }
  .others .reaction .emoji {
    #like {
      margin: 0;
    }

    i,
    img {
      background-color: white;
      margin-left: -10px;
    }
  }

  .post-text-container {
    padding-right: 10px;
  }

  .text {
    padding: 0.5rem 0;
    padding-left: 1rem;
    max-height: 185px;
    min-height: fit-content;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--like-color);
      border-radius: 30px;
    }
  }

  @media screen and (max-width: 760px) {
    height: 40%;
    overflow-y: scroll;
    box-shadow: none;
    z-index: 2;
    position: relative;

    .text {
      height: 100%;
      overflow-y: scroll;
      box-shadow: none;
      padding: 0.5rem 1rem;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--like-color);
      border-radius: 30px;
    }
  }
`;

export const ViewerFoot = styled(Foot)`
  border-top: 1px solid var(--normal-gray);
  padding: 0 1rem;
  height: fit-content;
  margin-left: 0;
  margin-right: 0;

  @media screen and (max-width: 530px){
    .discover-comments {
      display: none !important;
    }
    .buttons .post-action-comment{
      display: none !important;
    }
  }

  span.emoji-box {
    z-index: 5;
  }

  @media screen and (max-width: 760px) {
    span.emoji-box, .text-buttons {
      display: none;
    }
  }

  @media screen and (max-width: 760px) {
    margin-top: 0;
  }
`;
