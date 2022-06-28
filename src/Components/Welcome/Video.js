// Libraries
import React from "react";

// Styled Component
import { Container, WhiteArea, ColoredArea, Title } from "./Styles/VideoStyled";

const Video = () => {
  return (
    <Container>
      <WhiteArea></WhiteArea>
      <ColoredArea>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/IlYUUN8rL_Y"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Title>In it to chase my dream</Title>
      </ColoredArea>
    </Container>
  );
};

export default Video;
