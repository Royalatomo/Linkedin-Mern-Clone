import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  position: relative;

  /* show more button */
  .show-full-text-btn {
    position: absolute;
    bottom: 0;
    bottom: -14px;
    right: 10px;
    color: gray;
    font-weight: bolder;
    font-size: 14px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      color: var(--primary-color);
    }
  }

  /* visible all text - post class */
  .show-full-text {
    max-height: 100%;
    margin-bottom: 1.1rem;
  }
`;

// Text Container
export const PostTextDiv = styled.div`
  padding: 0 1rem;
  word-break: break-word;
  line-height: 1.45;
  font-size: 15px;
  color: var(--blackish-gray);
  overflow: hidden;
  position: relative;
  max-height: 68px;
  padding-right: 1rem;
  margin-bottom: 1.5rem;

  /* Tags */
  .hashtag {
    font-weight: 900;
    color: var(--primary-color);
  }
`;
