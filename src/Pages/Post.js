// Libraries
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { update as viewerUpdate } from "../app/slice/viewerSlice";
import { update as userUpdate } from "../app/slice/userSlice";
import { fetchToken } from "../app/slice/userSlice";
import { changeView } from "../app/slice/feedSlice";
import { posting } from "../app/slice/postingSlice";

// Funcational Components
import Header from "../Components/Feed/Header";
import UserInfo from "../Components/Feed/UserInfo";
import News from "../Components/Feed/News";
import Posting from "../Components/Feed/Posting";
import Manager from "../Components/Network/Manger";
import ImgViewer from "../Components/Feed/ImgViewer";
import MobComment from "../Components/Feed/MobComment";
import Dashboard from "../Components/Network/Dashboard";
import UserUpdate from "../Components/Feed/UserUpdate";
import UserPost from "../Components/Feed/UserPost";

// Styled Components
import { Container, ExploreHolder, NetworkHolder } from "./Styles/FeedStyled";

// ENV
import { API } from "../env";

// Post - Home Section
const Explore = ({ userUpdate }) => {
  const dispatch = useDispatch();
  // resetting veiwer images
  dispatch(viewerUpdate({ imgs: [], position: 0 }));

  useEffect(() => {
    userUpdate();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ImgViewer />
      <MobComment />
      <UserPost />

      <ExploreHolder>
        <UserInfo />
        <Posting thisUser={true} />
        <News />
      </ExploreHolder>
    </>
  );
};

// Post - Network Section
const Network = () => {
  const userToken = useSelector((state) => state.user?.token);

  const [networkInfo, setNetworkInfo] = useState({
    connections: [],
    followers: [],
    followings: [],
    hashtags: [],
    reqs: [],
    sendReqs: [],
    users: false,
  });
  const [updateInfo, setUpdateInfo] = useState(true);

  const setInfo = async () => {
    const request = await fetch(`${API}/api/user?token=${userToken}`);
    const data = await request.json();
    if (!data.success) {
      console.log(data.error);
      return;
    }

    const responce2 = await fetch(`${API}/api/user/all?token=${userToken}`);
    const data2 = await responce2.json();
    if (!data2.success) {
      console.log(data2.error);
      return;
    }

    const users = [];
    const allUsers = data2.users;
    for (let i = 0; i < data2.users.length; i++) {
      let networkPresent = false;
      for (let network of data.user.networks) {
        if (allUsers[i] === network) {
          networkPresent = true;
          break;
        }
      }
      if (networkPresent) continue;

      let invitationPresent = false;
      for (let network of data.user.networkReqs) {
        if (allUsers[i] === network) {
          invitationPresent = true;
          break;
        }
      }

      if (invitationPresent) continue;

      let requested = false;
      for (let network of data.user.sendReqs) {
        if (allUsers[i] === network) {
          requested = true;
          break;
        }
      }

      let isFollowing = false;
      for (let following of data.user.following) {
        if (following === allUsers[i]) {
          if (!requested) {
            users.push({ _id: allUsers[i], following: true, requested: false });
          }
          isFollowing = true;
          break;
        }
      }

      if (isFollowing) continue;
      if (requested) {
        users.push({ _id: allUsers[i], following: false, requested: true });
      } else {
        users.push({ _id: allUsers[i], following: false, requested: false });
      }
    }

    setNetworkInfo({
      connections: data.user.networks,
      followers: data.user.followers,
      followings: data.user.following,
      hashtags: data.user.hashtag,
      reqs: data.user.networkReqs,
      sendReqs: data.user.sendReqs,
      users,
    });
  };

  const setUpdate = () => setUpdateInfo(!updateInfo);

  useEffect(() => {
    setInfo();

    // eslint-disable-next-line
  }, [updateInfo]);

  return (
    <NetworkHolder>
      <Manager update={setUpdate} info={networkInfo} />
      <div className="manager-holder" />
      {networkInfo.users && <Dashboard update={setUpdate} info={networkInfo} />}
    </NetworkHolder>
  );
};

// Main Component
const Post = () => {
  // user-info - for checking if the user not logged in
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(user.info);

  // which section to show
  const feed = useSelector((state) => state.feed);
  const userToken = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  dispatch(fetchToken());
  dispatch(posting({show: false}))

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const responce = await fetch(`${API}/api/user?token=${token}`);
    const data = await responce.json();

    if (!data.success) {
      localStorage.removeItem("token");
      console.log(data.error);
      return;
    }

    setUserInfo({
      uname: data.user.uname,
      headline: data.user.headline || "Hi! I am using linkedin",
      profile: data.user.profileImg,
      bg: data.user.bgImg,
    });
    dispatch(
      userUpdate({
        info: {
          uname: data.user.uname,
          headline: data.user.headline || "Hi! I am using linkedin",
          profile: data.user.profileImg,
          bg: data.user.bgImg,
          id: data.user._id
        },
      })
    );
  };

  useEffect(() => {
    dispatch(changeView({ show: "home" }));
    getUserInfo();
    // if mobile - exit
    if (window.innerWidth < 530) return;

    // scroll-top btn
    const scrollBtn = document.querySelector(".scroll-top");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        scrollBtn.classList.add("active-top");
      } else {
        scrollBtn.classList.remove("active-top");
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Container id="feed-container">
      {!localStorage.getItem("token") && <Navigate to="/login" />}
      <UserUpdate token={userToken} userInfo={userInfo} getUserInfo={getUserInfo} />
      <Header />
      <button className="scroll-top">
        <a href="#feed-container">
          <i className="fa-solid fa-circle-arrow-up"></i>
        </a>
      </button>
      {feed.show === "home" && <Explore userUpdate={getUserInfo} />}
      {feed.show === "my network" && <Network userUpdate={getUserInfo} />}
    </Container>
  );
};

export default Post;
