// Libraries
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

// Styled Components
import { Container, MediaHolder } from "./Styles/MediaStyled";

const PostMedia = (props) => {
  const { media, updateImgViewer, postId } = props;

  const MAX_IMG_DISPLAY = 4; // visible post
  const mediaLength = media?.length;

  useEffect(() => {
    // adjust MoreImg Div on every screen size change
    window.addEventListener("resize", () => {
      resizeMoreImg();
    });

    // eslint-disable-next-line
  }, []);

  if (!mediaLength) {
    return <></>;
  }

  const increaseQuality = (e) => {
    const img = e.currentTarget;
    if (img.dataset.quality) return;
    img.src = img.src.replace("?tr=w-30,h-30,q-1", "?tr=w-200,h-200,q-90");
    img.setAttribute("data-quality", true);
  };

  // Change Grid Layout - Based on image length
  const adjustImgContainer = (e) => {
    if (mediaLength > 4) return;
    const PostImgContainer = e.currentTarget;
    if (mediaLength === 1) {
      PostImgContainer.classList.add("img-container-one");
    } else if (mediaLength === 3) {
      const allImgs = PostImgContainer.querySelectorAll("img");
      PostImgContainer.classList.add("img-container-three");
      allImgs[0].style.gridArea = "one";
      allImgs[1].style.gridArea = "two";
      allImgs[2].style.gridArea = "three";
    }
  };

  // adjust moreImg div with last image size
  const resizeMoreImg = (e) => {
    if (mediaLength <= 4) return;
    try {
      const Post = document.getElementById(postId);
      const ImgContainer = Post.querySelector(".media .img-container");
      const moreImgDiv = ImgContainer.querySelector(".more-img");

      moreImgDiv.style.opacity = "0.7";
    } catch (error) {
      console.log(error);
    }
  };

  const imgInViewMode = (e) => {
    // Assuming last displayed image is the 4th one (POSITION from 0)
    let position = 3;

    // If more-img not clicked
    if (!e.currentTarget.classList.contains("more-img")) {
      position = +e.currentTarget.className.split("-")[1];
    }

    // display Img-Viwer & show this post
    updateImgViewer(position);
  };

  return (
    <Container className="media">
      <MediaHolder className="img-container" onLoad={adjustImgContainer}>
        {media.map((imgSrc, index) => {
          if (index > 3) return "";
          return (
            <img
              key={uuid()}
              onLoad={(e) => {
                resizeMoreImg(e);
                increaseQuality(e);
              }}
              loading="lazy"
              onClick={imgInViewMode}
              className={`media-${index}`}
              src={imgSrc + "?tr=w-30,h-30,q-1"}
              alt=""
            />
          );
        })}

        {mediaLength > MAX_IMG_DISPLAY && (
          <div onClick={imgInViewMode} className="more-img">
            +{mediaLength - MAX_IMG_DISPLAY}
          </div>
        )}
      </MediaHolder>
    </Container>
  );
};

export default PostMedia;
