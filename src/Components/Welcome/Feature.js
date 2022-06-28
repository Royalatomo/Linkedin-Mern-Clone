// Libraries
import React from "react";

// Styled Component
import {
  Container,
  ItemContainer,
  Title,
  ImageDiv,
  Button,
  DropBox,
} from "./Styles/FeatureStyled";

const Feature = () => {
  return (
    <Container>
      {/* Connect - Item */}
      <ItemContainer>
        <ImageDiv>
          <img src="/images/connect-people.svg" alt="" />
        </ImageDiv>
        <Title>Connect with people who can help</Title>
        <Button to="/">Find people you know</Button>
      </ItemContainer>

      {/* Learn Skill - Item */}
      <ItemContainer>
        <ImageDiv>
          <img src="/images/learn-skills.svg" alt="" />
        </ImageDiv>
        <Title>Learn the skills you need to succeed</Title>
        <DropBox>
          Choose a topic to learn about{" "}
          <i className="fa-solid fa-caret-down"></i>
        </DropBox>
      </ItemContainer>
    </Container>
  );
};

export default Feature;
