import styled from "styled-components";

export const Container = styled.div`
  @media screen and (max-width: 530px) {
    display: none;
  }
`;

export const CommentPosting = styled.div`
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 530px) {
    align-items: center;

    .profile-img img {
      height: 32px;
      width: 32px;
    }

    .comment-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 75%;
      margin-right: 10px;

      .commenting {
        border: none;
        resize: none;
        font-size: 16px;
        height: 20px;
        color: gray;
        width: 88%;

        &:focus {
          outline: none;
        }
      }
    }
  }

  @media screen and (max-width: 370px) {
    .comment-section .commenting {
      font-size: 14px;
      height: 16px;
    }
  }
`;

export const CommentArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 1rem;

  .commenting {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid;
    border-radius: 20px;
    padding: 0.6rem 1rem;
    word-break: break-word;
    padding-right: 3rem;
    line-height: 1.3;
    height: 40px;
    resize: none;
    font-size: 15px;
    color: gray;
    border: 2px solid gray;

    &::-webkit-scrollbar {
      width: 0;
    }

    &:focus {
      border: 2px solid #292626;
      color: #292626;
    }
  }
`;

export const EmojiIconDiv = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  i {
    font-size: 20px;
  }

  .emoji-box {
    position: relative;

    .emoji-picker-react {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-95%, -100%);
      box-shadow: none;
    }
  }
`;

export const PostCommentBtn = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: -0.7rem;
  padding-left: 11%;

  button {
    background: #0a66c2;
    border: none;
    font-size: 14px;
    padding: 0.3rem 0.7rem;
    font-weight: bolder;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  @media screen and (max-width: 530px) {
    width: 10%;
    margin: 0;
    padding-left: 2%;
    
    button {
      border: none;
      background: white;
      font-size: 15px;
      font-weight: bold;
      color: gray;
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: 370px) {
    button {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 300px) {
    button {
      font-size: 13px;
    }
  }
`;

export const CloseBtn = styled.i`
  margin: 0 auto;
`;
