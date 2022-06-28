// Libraries
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

// Styled Components
import { Container, PostTextDiv } from "./Styles/TextStyled";

// Converts Plain Text To HTML & Hashtags
const converToText = (content) => {
  if (!content) return;
  const convertedText = [];
  content.forEach((element) => {
    const elementWords = element.split(" ");
    for (let word of elementWords) {
      if (word.startsWith("#")) {
        convertedText.push(
          <Link key={uuid()} className="hashtag" to={`/tags/${word.slice(1)}`}>
            {word}{" "}
          </Link>
        );
      } else if (word === "") {
        convertedText.push(<br key={uuid()} />);
      } else {
        convertedText.push(word + " ");
      }
    }
  });

  return convertedText;
};

const PostText = (props) => {
  const [showMore, setShowMore] = useState(false);
  const { content, imgViewer, id } = props;

  useEffect(() => {
    const text = document.querySelector(`#${id} .post-text-container .text`);
    if (text?.scrollHeight > 68) {
      setShowMore(true);
    }

    // eslint-disable-next-line
  }, []);

  // make whole text visible
  const showFullText = (e) => {
    const element = e.currentTarget;
    if (!element) return;
    const text = element.parentElement.querySelector(".text");
    e.currentTarget.style.display = "none";
    text.classList.add("show-full-text");
  };

  return (
    <Container className="post-text-container">
      <PostTextDiv className="text">
        {converToText(content)?.map((element) => element)}{" "}
      </PostTextDiv>
      {!imgViewer && showMore && (
        <p key={uuid()} onClick={showFullText} className="show-full-text-btn">
          ...see more
        </p>
      )}
    </Container>
  );
};

export default PostText;
