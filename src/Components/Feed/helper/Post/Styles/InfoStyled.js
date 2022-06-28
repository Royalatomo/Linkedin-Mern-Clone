import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  padding: 0 1rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;

  /* Total Comments */
  .comments {
    margin-left: auto;
    font-size: 14px;
    margin-right: 12px;
  }

  /* Total Shares */
  .shares {
    font-size: 14px;
  }

  @media screen and (max-width: 415px) {
    .comments,
    .shares {
      font-size: 13px;
    }

    padding: 0 0.5rem 0 1.5rem;
  }
`;

// Emoji Reaction Container
export const InfoReaction = styled.div`
  display: flex;
  align-items: center;

  /* Emoji Container */
  .emoji {
    display: flex;
    align-items: center;
    margin-right: 0.3rem;

    /* Emoji */
    i {
      font-size: 14px;
      border: 2px solid;
      padding: 3px;
      border-radius: 50%;
      min-width: 20px;
      overflow: hidden;
    }

    i,
    img {
      margin-left: 0.4rem;
    }

    img {
      height: 21px;
      border: 2px solid;
      padding: 3px;
      border-radius: 50%;
      min-width: 20px;
      overflow: hidden;
      color: var(--curious-color);
    }

    @media screen and (max-width: 415px) {
      i,
      img {
        border: 2px solid;
        background-color: white;
        margin-left: -12px;
      }

      #like {
        margin-left: 0;
      }

      img {
        height: 20px;
      }
    }
  }

  /* Total Number of reactions */
  .count {
    font-size: 15px;

    @media screen and (max-width: 415px) {
      font-size: 13px;
    }
  }
`;
