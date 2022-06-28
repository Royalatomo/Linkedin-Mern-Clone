import styled from "styled-components";

// Main Holding Div
export const Post = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding-top: 1rem;
  box-shadow: 0 0 1px black;
  margin: 0 auto 1rem;

  .heigh-full {
    height: 100%;
  }

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

  @media screen and (max-width: 470px) {
    width: 400px;
  }

  @media screen and (max-width: 430px) {
    width: initial;
    margin: 0 auto 1rem;
  }

  @media screen and (max-width: 327px) {
    border-radius: 0;
  }
`;

// Post Head Container
export const Head = styled.div`
  display: flex;
  padding: 0 1rem;
`;

// Post Body Container
export const Body = styled.div`
  margin-top: 0.75rem;
`;

// Post Foot Container
export const Foot = styled.div`
  margin: 0 1rem;
  border-top: 2px solid var(--normal-gray);
  margin-top: 1rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 60px;

  /* Buttons Container */
  .buttons {
    display: flex;
    justify-content: space-evenly;
  }

  /* Comment Button */
  .comments {
    margin-top: 15px;
  }

  /* All Comments Area */
  .discover-comments {
    margin: 1rem 0;

    .comment-show-more {
      width: 100%;
      font-size: 14px;
      background: #95959557;
      color: var(--blackish-gray);
      padding: 0.5rem;
      border-radius: 40px;
      text-transform: capitalize;
      letter-spacing: 1px;
      font-weight: bold;
      cursor: pointer;
      transition: var(--slow-transition);

      &:hover {
        background-color: var(--blackish-gray);
        color: white;
      }
    }
  }
`;
