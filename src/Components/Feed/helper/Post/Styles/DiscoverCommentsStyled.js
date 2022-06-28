import styled from "styled-components";

export const CommentContainer = styled.div`
  margin-bottom: 1.2rem;
  .posting {
    margin-top: 1rem;

    .profile-img {
      margin-right: 8px;
    }
  }
`;

export const MainComment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.4rem;

  .profile-img-container {
    margin-right: 0.6rem;
    margin-top: 0.6rem;
  }

  .profile-info-container {
    background: #ececec;
    padding: 0.6rem;
    border-radius: 6px;
    position: relative;
  }

  .time-container {
    margin-left: auto;

    .post-date {
      margin-right: 0.4rem;
    }
  }

  .main-info .more-option-button {
    margin-left: 0;
  }

  .headline {
    margin-bottom: 0.8rem;
  }

  .content {
    font-size: 14px;
    letter-spacing: 0.8px;
  }

  .author-name {
    background: #56687a;
    font-size: 12px;
    padding: 2px 5px;
    color: white;
    border-radius: 3px;
    letter-spacing: 0.4px;
  }

  @media screen and (max-width: 500px) {
    .main-info {
      margin-bottom: 0;
      flex-wrap: wrap;
      .name {
        font-size: 14px;
      }

      .headline {
        font-size: 12px;
      }

      .content {
        font-size: 13px;
      }
    }

    @media screen and (max-width: 320px) {
      .author {
        font-size: 10px;
      }
    }
  }
`;

export const ReplyingArea = styled.div`
  position: absolute;
  bottom: -25px;
  left: 0px;
  display: flex;
  align-items: center;

  button {
    border: 0;
    background-color: transparent;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;

    .btn-text {
      text-transform: capitalize;
      font-size: 12px;
      letter-spacing: 0.5px;
      font-weight: 900;
      color: #393939;
    }

    &:hover {
      background: #edededa8;
    }
  }

  .reply-divider {
    color: #3a3737;
    margin-left: 1rem;
  }

  .total-reply-count {
    font-size: 12px;
    letter-spacing: 0.5px;
    margin-left: 10px;
    color: #3a3737;
  }
`;

export const ReplyContainer = styled.div`
  padding-left: 3rem;

  .show-more-replies {
    width: 100%;
    margin-top: 1rem;
    background: var(--light-gray);
    padding: 5px 0;
    color: var(--blackish-gray);
    text-transform: capitalize;
    letter-spacing: 0px;
    border-radius: 40px;
    font-weight: bold;
    transition: var(--slow-transition);
    cursor: pointer;

    &:hover {
      background-color: var(--blackish-gray);
      color: white;
    }
  }
`;

export const ReplyComment = styled(MainComment)`
  margin-top: 1rem;
  margin-bottom: 0;
`;