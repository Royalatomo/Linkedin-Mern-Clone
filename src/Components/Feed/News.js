// Libraries
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux"; // redux

// DB
import NewsDB from "../extra/NewsDB";

// Styled Components
import { Container, Heading, NewsSection } from "./Styles/NewsStyled";
import { Item, Title, Info, Marker, Holder } from "./Styles/NewsStyled";

// News Section (Heading not included)
const NewsBodyContainer = () => {
  // no. of news displayed in showLess mode
  const DISPLAY_NUMBER = 5;
  const slicedNews = NewsDB.slice(0, DISPLAY_NUMBER);
  const [visibleNews, setVisibleNews] = useState(slicedNews);

  // Check if all news are fitting in showLess mode
  const isNewsFitting = NewsDB.length <= DISPLAY_NUMBER;
  const allNewsLenght = NewsDB.length;

  // Toggle showLess/showMore
  const toggelNews = (e) => {
    const element = document.createElement("i");

    // If all news are displayed (Hide)
    if (visibleNews.length === allNewsLenght) {
      element.setAttribute("class", "fa-solid fa-angle-down");
      e.currentTarget.innerHTML = `Show more ${element.outerHTML}`;
      setVisibleNews(slicedNews);
      return;
    }

    // If few news are displayed (Show)
    element.setAttribute("class", "fa-solid fa-angle-up");
    e.currentTarget.innerHTML = `Show less ${element.outerHTML}`;
    setVisibleNews(NewsDB);
  };

  return (
    <NewsSection>
      {visibleNews.map((news) => {
        return (
          <Item key={uuid()}>
            <Marker />
            <div className="text">
              <Title>{news.title}</Title>
              <Info>{news.info}</Info>
            </div>
          </Item>
        );
      })}

      {!isNewsFitting && (
        <button className="news-button" onClick={toggelNews}>
          Show more <i className="fa-solid fa-angle-down"></i>
        </button>
      )}
    </NewsSection>
  );
};

// News Container Web View
const WebNews = () => {
  return (
    <Holder>
      <Heading>
        <p>LinkedIn News</p>
        <i className="fa-solid fa-circle-info"></i>
      </Heading>

      <NewsBodyContainer />
    </Holder>
  );
};

// News Container Mobile View
const MobNews = () => {
  // Check if the news prompt opened
  const [open, setOpen] = useState(false);

  // Make news prompt visible
  const setActive = (e) => {
    if (open) return;
    e.currentTarget.classList.add("active");
    const icon = e.currentTarget.querySelector("i");
    if (!icon) return;
    icon.setAttribute("class", "fa-solid fa-angles-down");
    setOpen(true);
  };

  // Make news prompt hidden (small)
  const setUnactive = (e) => {
    if (!open) return;
    e.currentTarget.setAttribute("class", "fa-solid fa-angles-up");
    let container = e.currentTarget.parentElement;
    if (!container && !container.parentElement) return;
    container = container.parentElement;
    container.classList.remove("active");
    setOpen(false);
  };

  return (
    <Holder className="mob-news-container" onClick={setActive}>
      <Heading>
        <p>LinkedIn News</p>
        <i onClick={setUnactive} className="fa-solid fa-angles-up"></i>
      </Heading>
      <NewsBodyContainer />
    </Holder>
  );
};

// Main Container
const News = () => {
  const width = useSelector((state) => state.width);
  return <Container>{width > 991 ? <WebNews /> : <MobNews />}</Container>;
};

export default News;
