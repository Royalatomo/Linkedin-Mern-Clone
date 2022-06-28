// Libraries
import React from "react";
// ReviewDB
import ReviewDB from "../extra/ReviewDB";

// Slider Styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled Components
import {
  Container,
  Carosel,
  ReviewContainer,
  TextContainer,
  Title,
  Content,
  Image,
} from "./Styles/ReviewStyled";

// Individual Review Container
const ReviewComponet = (props) => {
  const { title, content, profileUrl } = props;
  return (
    <ReviewContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TextContainer>

      <Image loading="lazy" src={profileUrl} />
    </ReviewContainer>
  );
};

// Main Component
const Review = () => {
  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <Container>
      <Carosel {...settings}>
        {ReviewDB.map((person, index) => {
          return <ReviewComponet {...person} key={`review-${index}`} />;
        })}
      </Carosel>
    </Container>
  );
};

export default Review;
