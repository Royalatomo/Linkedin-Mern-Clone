// Libraries
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../app/slice/dashboardSlice";

// Styled Components
import { ReqContainer, ReqTitle, Requests } from "./Styles/DashboardStyled";
import { Request, ReqButtons, Ignore } from "./Styles/DashboardStyled";
import { Accept, Remove } from "./Styles/DashboardStyled";

// Functional Components
import Suggestion from "./Suggestion";
import User from "./User";
import Hashtag from "./Hashtag";

// ENV
import { API, HEADLINE, PROFILE_IMG } from "../../env";
import { EMPTY_REQs, EMPTY_CONNECTIONs, EMPTY_FOLLOWERs } from "../../env";
import { EMPTY_FOLLOWINGs, EMPTY_TAGs, EMPTY_SEND_REQs } from "../../env";

const ReqBtn = ({ userId, token, update, deInfo }) => {
  const Request = async (url, method, id, update) => {
    const responce = await fetch(`${url}?token=${token}&userId=${userId}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await responce.json();
    if (!data.success) {
      alert("Something went wrong");
      console.log(data.error);
      return;
    }
    update();
  };

  const acceptReq = () => {
    const user = document.getElementById(`request-${userId}`);
    const hr = document.querySelector(`#request-${userId}+hr`);
    user.remove();
    if (hr) hr.remove();
    Request(`${API}/api/user/update/accept-network`, "POST", userId, update);
    Request(`${API}/api/user/update/following`, "POST", userId, update);
    deInfo();
  };

  const rejectReq = () => {
    const user = document.getElementById(`request-${userId}`);
    const hr = document.querySelector(`#request-${userId}+hr`);
    user.remove();
    if (hr) hr.remove();
    Request(`${API}/api/user/update/remove-request`, "DELETE", userId, update);
    deInfo();
  };

  const width = useSelector((state) => state.width);
  return (
    <ReqButtons>
      <Ignore onClick={rejectReq}>
        {width > 610 ? "Ignore" : <i className="fa-solid fa-circle-xmark" />}
      </Ignore>
      <Accept onClick={acceptReq}>
        {width > 610 ? "Accept" : <i className="fa-solid fa-circle-check" />}
      </Accept>
    </ReqButtons>
  );
};

const OtherBtn = ({ name, userId, token, update }) => {
  const Request = async (url, method, id, update) => {
    const responce = await fetch(`${url}?token=${token}&userId=${userId}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await responce.json();
    if (!data.success) {
      alert("Something went wrong");
      console.log(data.error);
      return;
    }
    update();
  };

  const remove = () => {
    const user = document.getElementById(`main-${userId}`);
    const hr = document.querySelector(`#main-${userId}+hr`);

    user.remove();
    if (hr) hr.remove();
    const itemChilds = document.querySelector(`.item-container`).children;
    const lastChild = itemChilds[itemChilds.length - 1]?.tagName;
    if (lastChild === "HR") itemChilds[itemChilds.length - 1].remove();

    switch (name) {
      case "connections":
        Request(
          `${API}/api/user/update/remove-network`,
          "DELETE",
          userId,
          update
        );
        break;

      case "followers":
        Request(`${API}/api/user/update/follow`, "DELETE", userId, update);
        break;

      case "followings":
        Request(`${API}/api/user/update/following`, "DELETE", userId, update);
        break;

      case "requests":
        Request(
          `${API}/api/user/update/remove-send-request`,
          "DELETE",
          userId,
          update
        );
        break;

      default:
        break;
    }
  };
  const width = useSelector((state) => state.width);
  return (
    <ReqButtons>
      <Remove onClick={remove}>
        {width > 610 ? "Remove" : <i className="fa-solid fa-circle-xmark" />}
      </Remove>
    </ReqButtons>
  );
};

const Dashboard = ({ update, info }) => {
  const dashboardOption = useSelector((state) => state.dashboard);
  const userToken = useSelector((state) => state.user?.token);
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState([]);
  const dispatch = useDispatch();

  const updateViewer = async (total) => {
    const appendUsers = [];
    let index = 0;
    for (let i = position; i < info.reqs.length; i++) {
      if (info.reqs[i] === undefined || index === total) {
        break;
      }

      const responce = await fetch(
        `${API}/api/user/basic?token=${userToken}&userId=${info.reqs[i]}`
      );
      const data = await responce.json();
      if (!data.success) {
        console.log(data.error);
        break;
      }

      const user = data.user;
      appendUsers.push({
        id: info.reqs[i],
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
    updateViewer(2);
  };

  useEffect(() => {
    dispatch(change({ value: "suggestions" }));
    showMore();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ReqContainer>
        <ReqTitle>
          Invitations <span>({info.reqs.length})</span>
        </ReqTitle>
        <Requests>
          {visible.map((req, index) => {
            return (
              <>
                <Request key={`req-main-${index}`} id={`request-${req.id}`}>
                  <img src={req.img+"?tr=h-60,w-60"} alt="" />
                  <div className="user-info-container">
                    <div className="info">
                      <h4 className="name">{req.name}</h4>
                      <p className="headline">{req.headline}</p>
                    </div>
                    <ReqBtn
                      userId={req.id}
                      token={userToken}
                      update={update}
                      key={`req-btn-${index}`}
                      deInfo={() => setPosition(info.reqs.length - 1)}
                    />
                  </div>
                </Request>
                {visible.length !== index + 1 && <hr key={`req-hr-${index}`} />}
              </>
            );
          })}
          {info.reqs.length === 0 && (
            <Request style={{ textAlign: "center" }}>
              <h4 style={{ width: "100%", marginBottom: ".8rem" }}>
                {EMPTY_REQs}
              </h4>
            </Request>
          )}
          {position !== info.reqs.length && (
            <button className="show-all-btn" onClick={showMore}>
              Show All
            </button>
          )}
        </Requests>
      </ReqContainer>

      {dashboardOption === "suggestions" && (
        <Suggestion update={update} info={info.users} />
      )}
      {dashboardOption === "connections" && (
        <User
          name={dashboardOption}
          msg={EMPTY_CONNECTIONs}
          Btns={OtherBtn}
          info={info.connections}
          update={update}
        />
      )}
      {dashboardOption === "followers" && (
        <User
          name={dashboardOption}
          msg={EMPTY_FOLLOWERs}
          Btns={OtherBtn}
          info={info.followers}
          update={update}
        />
      )}
      {dashboardOption === "followings" && (
        <User
          name={dashboardOption}
          msg={EMPTY_FOLLOWINGs}
          Btns={OtherBtn}
          info={info.followings}
          update={update}
        />
      )}
      {dashboardOption === "hashtags" && (
        <Hashtag
          name={dashboardOption}
          msg={EMPTY_TAGs}
          Btns={OtherBtn}
          info={info.hashtags}
          update={update}
        />
      )}
      {dashboardOption === "requests" && (
        <User
          name={dashboardOption}
          msg={EMPTY_SEND_REQs}
          Btns={OtherBtn}
          info={info.sendReqs}
          update={update}
        />
      )}
    </div>
  );
};

export default Dashboard;
