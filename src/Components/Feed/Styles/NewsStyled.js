import styled from "styled-components";

// Main Container
export const Container = styled.div`
  /* News Holding Div - Mobile */
  .mob-news-container {
    position: fixed;
    bottom: 0;
    transform: translateY(85%);
    transition: all 0.2s linear;

    @media screen and (max-width: 529px) {
      bottom: 65px;
      left: 10px;
    }

    @media screen and (max-width: 340px) {
      bottom: 38px;
    }
  }

  /* News Holding Div - Mobile (When Opened) */
  .active {
    transform: translateY(0);
  }
`;

// News Container Div
export const Holder = styled.div`
  height: fit-content;
  background: white;
  padding: 1rem 0 0.7rem;
  border-radius: 10px;
  box-shadow: var(--light-shadow) #0000007d;
  overflow: hidden;
`;

// All News Container (Heading not included)
export const NewsSection = styled.div`
  margin-top: 1rem;

  /* Show more/less button */
  button {
    background: none;
    border: none;
    font-size: 14px;
    padding: 0.5rem;
    border-radius: 5px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #666666;
    margin-left: 1rem;
    transition: all 150ms linear;
    margin-top: 0.45rem;

    &:hover {
      background-color: #ebebeb;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 991px) {
    max-height: 250px;
    overflow-y: scroll;
  }
`;

// News Container Heading
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  // Heading Text
  p {
    font-size: 18px;
    font-weight: 600;
  }
`;

// Individual News Item
export const Item = styled.div`
  display: flex;
  padding: 0.7rem 1rem 0.2rem;
  transition: all 150ms linear;

  &:hover {
    background-color: #ebebeb;
    cursor: pointer;
  }
`;

// Individual News Bullet point
export const Marker = styled.div`
  width: 6px;
  height: 6px;
  background: #666666;
  margin-top: 0.4rem;
  margin-right: 10px;
  border-radius: 50%;
`;

// Individual News Title
export const Title = styled.h3`
  font-size: 15px;
  margin-bottom: 0.3rem;
`;

// Individual News Body Text
export const Info = styled.p`
  font-size: 14px;
  color: gray;
`;
