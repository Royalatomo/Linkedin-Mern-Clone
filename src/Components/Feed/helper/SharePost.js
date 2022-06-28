// Libraries
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { posting } from "../../../app/slice/postingSlice";

// Styled Components
import { Item, SearchContainer, Container } from "../Styles/SharePostStyled";
import { Profile, InputBox, CreateContainer } from "../Styles/SharePostStyled";

// ENV
import {PROFILE_IMG} from "../../../env";

const SharePost = () => {
  const user = useSelector((state) => state.user);
  const width = useSelector((state) => state.width);
  const dispatch = useDispatch();

  const viewSharing = () => {
    dispatch(posting({ show: true }));
  };
  return (
    <>
      {width > 530 && (
        <Container className="share-post">
          <SearchContainer>
            <Profile>
              <img src={(user.info?.profile || PROFILE_IMG)+"?tr=w-50,h-50"} alt=""/>
            </Profile>

            <InputBox onClick={viewSharing}>
              <p>Start a post</p>
            </InputBox>
          </SearchContainer>

          <CreateContainer>
            <Item>
              <img src="/images/share-photo.svg" alt="" />
              <span>Photo</span>
            </Item>

            <Item>
              <img src="/images/share-video.svg" alt="" />
              <span>Video</span>
            </Item>

            <Item>
              <img src="/images/share-event.svg" alt="" />
              <span>Event</span>
            </Item>

            <Item>
              <img src="/images/share-article.svg" alt="" />
              <span>Write article</span>
            </Item>
          </CreateContainer>
        </Container>
      )}
    </>
  );
};

export default SharePost;
