// Libraries
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // redux

// Styled Components
import { Container, Title, ItemContainer } from "./Styles/SuggestionStyled";
import { Item, Profile, Buttons } from "./Styles/SuggestionStyled";
import { Follow, Connect } from "./Styles/SuggestionStyled";

// ENV
import { API, BACKGROUND_IMG, HEADLINE, PROFILE_IMG } from "../../env";

const Suggestion = ({ update, info }) => {
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
        `${API}/api/user/basic?token=${userToken}&userId=${info[i]._id}`
      );
      const data = await responce.json();
      if (!data.success) {
        console.log(data.error);
        break;
      }

      const user = data.user;
      appendUsers.push({
        _id: info[i]._id,
        name: user.uname,
        headline: user.headline || HEADLINE,
        bgImg: user.bgImg || BACKGROUND_IMG,
        pImg: (user.profileImg ||PROFILE_IMG) ,
        following: info[i].following,
        requested: info[i].requested,
      });
      index++;
    }

    setVisible([...visible, ...appendUsers]);
    setPosition(position + index);
  };

  const showMore = () => {
    updateViewer(3);
  };

  useEffect(() => {
    setPosition(0);
    setVisible([]);
    showMore();

    // eslint-disable-next-line
  }, [info]);

  const Request = async (url, method, id) => {
    const responce = await fetch(`${url}?token=${userToken}&userId=${id}`, {
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

  const followIt = async (e, id) => {
    const text = e.currentTarget.innerText;

    if (text === "Follow") {
      e.currentTarget.classList.toggle("active-follow");
      e.currentTarget.innerText = "Unfollow";
      Request(`${API}/api/user/update/following`, "POST", id);
    } else {
      const confirm = window.confirm("Unfollow this user?");
      if (!confirm) return;
      e.currentTarget.classList.toggle("active-follow");
      e.currentTarget.innerText = "Follow";
      Request(`${API}/api/user/update/following`, "DELETE", id);
    }
  };

  const connectIt = async (e, id) => {
    const text = e.currentTarget.innerText;
    const parent = e.currentTarget.parentElement;
    let followBtn = parent.querySelector(".active-follow");
    const user = document.getElementById(`main-${id}`);

    if (text === "Connect") {
      e.currentTarget.innerText = "Requested";
      e.currentTarget.classList.toggle("active-connect");
      if (!followBtn) {
        followBtn = parent.querySelectorAll("button")[0];
        followBtn.classList.toggle("active-follow");
        followBtn.innerText = "Unfollow";
        Request(`${API}/api/user/update/following`, "POST", id);
      }
      Request(`${API}/api/user/update/add-network`, "POST", id);
      user.remove();
      setPosition(info.length - 1);
    } else {
      const confirm = window.confirm("Your Request Will Be Removed");
      if (!confirm) return;
      e.currentTarget.classList.toggle("active-connect");
      e.currentTarget.innerText = "Connect";
      if (followBtn) {
        followBtn.classList.toggle("active-follow");
        followBtn.innerText = "follow";
        Request(`${API}/api/user/update/following`, "DELETE", id);
      }
      Request(`${API}/api/user/update/remove-send-request`, "DELETE", id);
    }
  };

  return (
    <Container>
      <Title>Suggestions For You</Title>
      <ItemContainer style={info.length === 0 ? { display: "flex" } : {}}>
        {visible.map((user) => {
          return (
            <Item id={`main-${user._id}`} key={`suggestion-${user._id}`}>
              <img
                src={user.bgImg+"?tr=h-100"}
                alt=""
                loading="lazy"
              />

              <Profile>
                <img
                  src={user.pImg+"?tr=h-80,w-80"}
                  alt=""
                />
                <h4 className="user-name">{user.name}</h4>
                <p className="headline">{user.headline}</p>
              </Profile>

              <Buttons>
                {user.following ? (
                  <Follow
                    onClick={(e) => followIt(e, user._id)}
                    className="active-follow"
                  >
                    Unfollow
                  </Follow>
                ) : (
                  <Follow onClick={(e) => followIt(e, user._id)}>Follow</Follow>
                )}
                {user.requested ? (
                  <Connect
                    onClick={(e) => connectIt(e, user._id)}
                    className="active-connect"
                  >
                    Requested
                  </Connect>
                ) : (
                  <Connect onClick={(e) => connectIt(e, user._id)}>
                    Connect
                  </Connect>
                )}
              </Buttons>
            </Item>
          );
        })}
        {info.length === 0 && (
          <div style={{ textAlign: "center", width: "100%" }}>
            <h4 style={{ width: "100%", marginBottom: ".8rem" }}>
              ❌❌ Nothing Here, you got everyone 🙃🙃 ❌❌
            </h4>
          </div>
        )}
      </ItemContainer>
      {position !== info.length && (
        <button className="show-all-btn" onClick={showMore}>
          Show More
        </button>
      )}
    </Container>
  );
};

export default Suggestion;
