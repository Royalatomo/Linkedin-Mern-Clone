// Libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // redux

// Functional Components
import { ItemContainer, Item } from "./Styles/ManageOptionStyled";
import { Container, Title } from "./Styles/SuggestionStyled";

// ENV
import { API, HEADLINE, PROFILE_IMG } from "../../env";

const Hashtag = ({ Btns, info }) => {
  const userToken = useSelector((state) => state.user?.token);
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState([]);

  const updateViewer = async (total) => {
    const appendUsers = [];
    let index = 0;
    for (let i = position; i < info.length; i++) {
      if (info[i] === undefined || index === total) {
        break;
      }

      const responce = await fetch(
        `${API}/api/user/basic?token=${userToken}&userId=${info[i]}`
      );
      const data = await responce.json();
      if (!data.success) {
        console.log(data.error);
        break;
      }

      const user = data.user;
      appendUsers.push({
        name: user.uname,
        headline: user.headline || HEADLINE,
        img: user.profileImg || PROFILE_IMG,
      });
      index++;
    }

    setVisible([...visible, ...appendUsers]);
    setPosition(position + index);
  };

  const showMore = () => {
    updateViewer(5);
  };

  useEffect(() => {
    showMore();

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Title>Followed Tags</Title>
      <ItemContainer>
        {visible.map((req, index) => {
          return (
            <>
              <Item key={`hashtag-main-${index}`}>
                <i className="fa-solid fa-hashtag" />
                <div className="user-info-container">
                  <div className="info">
                    <h4 className="name">{req.name}</h4>
                    <p className="headline">Posts: {req.posts}</p>
                  </div>
                  <Btns />
                </div>
              </Item>
              {visible.length !== index + 1 && (
                <hr key={`hashtag-hr-${index}`} />
              )}
            </>
          );
        })}
        {info.length === 0 && (
          <Item style={{ textAlign: "center" }}>
            <h4 style={{ width: "100%", marginBottom: ".8rem" }}>
              ❌❌ Looks like nothing is here 🤔🤔 ❌❌
            </h4>
          </Item>
        )}
        {position !== info.length && (
          <button className="show-all-btn" onClick={showMore}>
            Show All
          </button>
        )}
      </ItemContainer>
    </Container>
  );
};

export default Hashtag;
