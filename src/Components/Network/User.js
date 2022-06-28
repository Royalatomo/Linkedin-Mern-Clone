// Libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // redux

// Functional Components
import { ItemContainer, Item } from "./Styles/ManageOptionStyled";
import { Container, Title } from "./Styles/SuggestionStyled";

// ENV
import { API, HEADLINE, PROFILE_IMG } from "../../env";

const User = ({ Btns, name, msg, info, update }) => {
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
        id: info[i],
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
      <Title>Your {name}</Title>
      <ItemContainer className="item-container">
        {visible.map((req, index) => {
          return (
            <React.Fragment key={`main-${req.id}`}>
              <Item id={`main-${req.id}`}>
                <img
                  src={(req.img) + "?tr=h-70,w=70"}
                  alt=""
                />
                <div className="user-info-container">
                  <div className="info">
                    <h4 className="name">{req.name}</h4>
                    <p className="headline">{req.headline}</p>
                  </div>
                  <Btns
                    token={userToken}
                    name={name}
                    userId={req.id}
                    update={update}
                  />
                </div>
              </Item>
              {visible.length !== index + 1 && <hr key={`hr-${req.id}`} />}
            </React.Fragment>
          );
        })}
        {info.length === 0 && (
          <Item style={{ textAlign: "center" }} key={`main-msg`}>
            <h4 style={{ width: "100%", marginBottom: ".8rem" }}>{msg}</h4>
          </Item>
        )}
        {position < info.length && (
          <button className="show-all-btn" onClick={showMore}>
            Show All
          </button>
        )}
      </ItemContainer>
    </Container>
  );
};

export default User;
