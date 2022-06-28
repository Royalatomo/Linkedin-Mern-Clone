// Libraries
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../app/slice/dashboardSlice";

// Styled Components
import { Container, Title, OptionContainer, Options } from "./Styles/ManagerStyled";

const Manger = ({ info }) => {
  const width = useSelector((state) => state.width);
  const dispatch = useDispatch();

  const activate = (e, name) => {
    const btnAlreadyActive = document.querySelector(
      ".network-manager .option-container .active"
    );
    if (btnAlreadyActive) btnAlreadyActive.classList.remove("active");
    if (btnAlreadyActive === e.currentTarget) {
      dispatch(change({ value: "suggestions" }));
      return;
    }
    e.currentTarget.classList.add("active");
    dispatch(change({ value: name }));
  };

  const displayManager = (e) => {
    const icon = e.currentTarget.querySelector("i");
    const container = e.currentTarget.parentElement;

    if (icon.classList.contains("fa-angles-up")) {
      icon.classList.remove("fa-angles-up");
      icon.classList.add("fa-angles-down");
      container.classList.add("activate-manager");
    } else {
      icon.classList.remove("fa-angles-down");
      icon.classList.add("fa-angles-up");
      container.classList.remove("activate-manager");
    }
  };

  return (
    <Container className="network-manager">
      {width > 810 ? (
        <Title>Manage my network</Title>
      ) : (
        <Title onClick={displayManager}>
          Manage my network <i className="fa-solid fa-angles-up" />
        </Title>
      )}

        <OptionContainer className="option-container">
          <Options onClick={(e) => activate(e, "connections")}>
            <i className="fa-solid fa-users" />
            <p className="option-title">connections</p>
            <p className="option-count">{info.connections?.length}</p>
          </Options>

          <Options onClick={(e) => activate(e, "followers")}>
            <i className="fa-solid fa-users" />
            <p className="option-title">followers</p>
            <p className="option-count">{info.followers?.length}</p>
          </Options>

          <Options onClick={(e) => activate(e, "followings")}>
            <i className="fa-solid fa-user-check" />
            <p className="option-title">followings</p>
            <p className="option-count">{info.followings?.length}</p>
          </Options>

          <Options onClick={(e) => activate(e, "hashtags")}>
            <i className="fa-solid fa-hashtag" />
            <p className="option-title">hashtags</p>
            <p className="option-count">{info.hashtags?.length}</p>
          </Options>

          <Options onClick={(e) => activate(e, "requests")}>
            <i className="fa-solid fa-user-group" />
            <p className="option-title">Requests</p>
            <p className="option-count">{info.sendReqs?.length}</p>
          </Options>
        </OptionContainer>
    </Container>
  );
};

export default Manger;
