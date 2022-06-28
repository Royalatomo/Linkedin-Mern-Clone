// Libraries
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../app/slice/feedSlice";
import { fetchToken } from "../../app/slice/userSlice";
import { posting } from "../../app/slice/postingSlice";

// NavMenu DB
import { NavMenuWebDB } from "../extra/NavMenuDB";

// Styled Components
import { Container, Logo, SearchContainer } from "./Styles/HeaderStyled";
import { SearchBox, NavLink, Divider } from "./Styles/HeaderStyled";

// ENV
import { API, PROFILE_IMG } from "../../env";

// change button style on click (nav-menu)
const activate = (e) => {
  // remove active button if any
  const prvActiveButton = document.querySelector(".active");
  if (prvActiveButton) prvActiveButton.classList.remove("active");

  // set the clicked button as active
  const clickedButton = e.currentTarget;
  clickedButton.classList.add("active");
};

const userUpdate = () => {
  document.querySelector("#userinfo-update #uname").value = "";
  document.querySelector("#userinfo-update #headline").value = "";
  document.querySelector("#userinfo-update input#pImg").value = "";
  document.querySelector("#userinfo-update input#bgImg").value = "";
  document.getElementById("userinfo-update").classList.add("visible");
};

// Web View
const WebHeader = ({ token }) => {
  const [logged, setLogged] = useState(true);

  const dispatch = useDispatch();
  const updateFeed = (e, name) => {
    dispatch(changeView({ show: name }));
    activate(e);
  };

  const logout = async () => {
    const responce = await fetch(`${API}/api/user/logout?token=${token}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    const data = await responce.json();
    if (!data.success) {
      alert("Something went wrong");
      console.log(data.error);
      return;
    }
    localStorage.removeItem("token");
    dispatch(fetchToken());

    setLogged(false);
  };

  return (
    <>
      <SearchContainer>
        {!logged && <Navigate to="/login" />}
        <Logo to="/" onClick={(e) => updateFeed(e, "home")}>
          <img src="/images/home-logo.svg" alt="" />
        </Logo>
        <SearchBox>
          <i className="fa-solid fa-magnifying-glass" />
          <input placeholder="Search" type="text" />
          <span>Search</span>
        </SearchBox>
      </SearchContainer>

      <NavLink>
        {NavMenuWebDB.map((menu, index) => {
          if (menu.to) {
            return (
              <Link
                onClick={(e) => updateFeed(e, menu.name)}
                key={index}
                className="icon-div"
                to={menu.to}
              >
                <i className={menu.iconLink} />
                <span>{menu.name}</span>
              </Link>
            );
          }
          return (
            <button
              onClick={(e) => updateFeed(e, menu.name)}
              key={index}
              className="icon-div"
            >
              <i className={menu.iconLink} />
              <span>{menu.name}</span>
            </button>
          );
        })}

        <Divider />

        <button className="icon-div me-btn">
          <i className="fa-solid fa-user" />
          <span>Me <i className="fa-solid fa-caret-down" /></span>

          <ul className="dropdown-box">
            <li className="profile" onClick={userUpdate}>Profile</li>
            <Link className="posts" to="/post">Posts</Link>
            <li className="logout" onClick={logout}>Logout</li>
          </ul>
        </button>

        <span className="premium">Try Premium for free</span>
      </NavLink>
    </>
  );
};

// Mob View
const MobileHeader = () => {
  const userInfo = useSelector((state) => state.user)?.info;
  const dispatch = useDispatch();
  const updateFeed = (e, name) => {
    if (name === "post") return;
    dispatch(changeView({ show: name }));
    activate(e);
  };

  const viewSharing = () => {
    dispatch(posting({ show: true }));
  };

  return (
    <>
      <SearchContainer>
        <button className="icon-div profile">
          <img
            src={(userInfo.profile || PROFILE_IMG)+"?tr=w-100,h-100"}
            alt=""
            onClick={userUpdate}
          />
        </button>

        <SearchBox>
          <i className="fa-solid fa-magnifying-glass" />
          <input placeholder="Search" type="text" />
        </SearchBox>

        <Link className="message" onClick={activate} to="/post">
          <i className="fa-solid fa-check-to-slot" />
        </Link>
      </SearchContainer>

      <NavLink>
        <Link
          to="/feed"
          className="icon-div"
          onClick={(e) => updateFeed(e, "home")}
        >
          <i className="fa-solid fa-house-chimney" />
          <span>home</span>
        </Link>

        <button
          className="icon-div"
          onClick={(e) => updateFeed(e, "my network")}
        >
          <i className="fa-solid fa-user-group" />
          <span>my network</span>
        </button>

        <button
          className="icon-div"
          onClick={(e) => {
            updateFeed(e, "post");
            viewSharing();
          }}
        >
          <i className="fa-solid fa-square-plus" />
          <span>post</span>
        </button>

        <button
          className="icon-div"
          onClick={(e) => updateFeed(e, "notifications")}
        >
          <i className="fa-solid fa-bell" />
          <span>notifications</span>
        </button>

        <button className="icon-div" onClick={(e) => updateFeed(e, "jobs")}>
          <i className="fa-solid fa-briefcase" />
          <span>jobs</span>
        </button>
      </NavLink>
    </>
  );
};

// Main Component
const Header = () => {
  const width = useSelector((state) => state.width);
  const userToken = useSelector((state) => state.user?.token);
  return (
    <Container>
      {width > 529 ? <WebHeader token={userToken} /> : <MobileHeader />}
    </Container>
  );
};

export default Header;
