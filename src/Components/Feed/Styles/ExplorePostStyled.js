import styled from "styled-components";

// Main Holding Div
export const Container = styled.div``;

// All Post Container
export const PostContainer = styled.div`
  padding-top: 10px;

  img.loading {
    margin: 0 auto;
    display: block;
  }

  .show-more {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: capitalize;
    width: 100%;
    background: #8080808c;
    margin-bottom: 2rem;
    padding: 0.5rem 0;
    color: var(--blackish-gray);
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    transition: var(--quick-transition);

    &:hover {
      background: var(--blackish-gray);
      color: white;
    }
  }
`;
