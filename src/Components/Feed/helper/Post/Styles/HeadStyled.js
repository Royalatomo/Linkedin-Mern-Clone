import styled from "styled-components";

// Post - Profile Container
export const ProfileImgDiv = styled.div`
  margin-right: 1rem;

  // Profile Image
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: contain;
  }

  @media screen and (max-width: 327px) {
    img {
      height: 35px;
    }
    margin-right: 0.6rem;
  }
`;

// Post - Head Text Container
export const ProfileInfoDiv = styled.div`
  width: 100%;

  /* First Line: Name, State, Button Container */
  .main-info {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;

    .name {
      margin-right: 0.5rem;
      font-size: 15px;
    }

    .status {
      color: var(--dark-gray);
      font-size: 14px;
    }

    .more-option-button {
      margin-left: auto;
      background: none;
      border: none;

      i, img {
        cursor: pointer;
      }

      i {
        font-size: 1rem;
        background: gray;
        padding: 3px 6px;
        border-radius: 50%;
        color: white;
      }
    }
  }

  .headline {
    font-size: 13px;
    color: var(--dark-gray);
    margin-bottom: 0.3rem;
    line-height: 1.2;
    max-width: 468px;
  }

  @media screen and (max-width: 327px) {
    .main-info name,
    .main-info .status {
      font-size: 13px;
    }

    .headline {
      font-size: 12px;
    }
  }
`;

// Post - Upload Date Container
export const PostTimeDiv = styled.div`
  display: flex;
  color: var(--dark-gray);
  font-size: 13px;

  .post-date {
    margin-right: 0.2rem;
  }
`;
