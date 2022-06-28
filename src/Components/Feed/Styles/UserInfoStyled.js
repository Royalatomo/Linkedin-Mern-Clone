import styled from "styled-components";

// Main Holding Div
export const Container = styled.div`
  background-color: transparent;
  min-width: 210px;
  max-width: 230px;

  /* Discover more - Container */
  .discover {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 0 0;
    border-radius: 10px;
    box-shadow: var(--light-shadow) #0000007d;
    overflow: hidden;

    /* All Links (Including Discover-more button) */
    span {
      color: var(--primary-color);
      font-size: 13px;
      font-weight: 600;
      text-transform: capitalize;
      padding: 0 1rem;
    }

    /* events-section */
    .events {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0 0.4rem;
      padding-right: 0.3rem;

      /* icon */
      i {
        font-size: 16px;
        color: var(--dark-gray);
        background: transparent;
        padding: 0.3rem 0.4rem;
        border-radius: 50%;
        transition: var(--quick-transition);

        &:hover {
          background: var(--normal-gray);
          color: black;
          cursor: pointer;
        }
      }

      /* Section Text */
      p:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    /* More Section */
    .more {
      text-align: center;
      padding: 0.5rem 0 0.7rem;
      transition: var(--quick-transition);

      /* Section Text */
      span {
        font-size: 14px;
        color: var(--blackish-gray);
        letter-spacing: 0.7px;
      }

      &:hover {
        background-color: var(--dark-white);
        cursor: pointer;
      }
    }

    /* hashtag section */
    .hashtags {
      margin-bottom: 0.9rem;
    }

    .groups:hover,
    .hashtags:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

// General Sections
export const Section = styled.div`
  background: white;
  overflow: hidden;
  border-radius: 10px;
`;

// Container with Bg Image
export const InfoConatiner = styled.div`
  box-shadow: var(--light-shadow) black;
  overflow: hidden;
  border-radius: 10px;

  & > img {
    background-image: url("/images/profile-bg-img.svg");
    width: 100%;
    height: 80px;
    object-fit: cover;
  }

  /* Items column */
  .items-section {
    padding: 1rem;
    font-size: 15px;

    /* icon */
    i {
      margin-right: 10px;
    }
  }

  .connection-section,
  .premium-section,
  .items-section {
    transition: var(--quick-transition);
    &:hover {
      background-color: var(--light-white);
      cursor: pointer;
    }
  }
`;

// UserInfo - Connection Section
export const Connection = styled(Section)`
  padding: 1rem;
  color: var(--ligth-black);

  /* column sub-title */
  .heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-size: 13px;

    /* sub-title text */
    span {
      color: var(--dark-gray);
      font-weight: 600;
    }

    /* connect icon */
    i {
      font-size: 15px;
    }
  }
  /* Connection column - Main title */
  p {
    font-size: 14px;
    font-weight: 600;
  }
`;

// UserInfo - Premium Section
export const Premium = styled(Section)`
  padding: 1rem;

  /* sub-title text */
  span {
    font-size: 12px;
  }

  /* main container (title, icon) */
  div {
    display: flex;
    font-size: 13.3px;
    margin-top: 0.4rem;
    align-items: center;
    font-weight: 600;

    /* icon */
    i {
      margin-right: 0.3rem;
      color: var(--bright-orange);
    }
  }
`;

// UserInfo - Profile Section
export const Profile = styled.div`
  position: relative;
  text-align: center;
  padding-bottom: 2rem;
  background-color: white;

  /* user profile img */
  img {
    object-fit: cover;
    height: 80px;
    width: 80px;
    margin-top: -25%;
    border-radius: 50%;
    border: 2px solid white;
    margin-top: -15%;
  }

  .user-name {
    margin: 0.7rem 0 0.3rem;
  }

  .headline {
    color: var(--dark-gray);
    font-size: 14px;
  }
`;
