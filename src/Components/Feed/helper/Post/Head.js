// Libraries
import React from "react";
import { useSelector } from "react-redux"; // redux

// Styled Components
import { ProfileImgDiv, ProfileInfoDiv, PostTimeDiv } from "./Styles/HeadStyled";

// ENV
import { API, PROFILE_IMG, HEADLINE } from "../../../../env";

const PostHead = (props) => {
  const { profileUrl, name, headline, time, imgViewer, postId } = props;
  const userInfo = useSelector((state) => state.user)?.info;
  const splitId = postId?.split("-");
  const deletePost = async () => {
    const confirm = window.confirm("Are you sure to delete it?");
    if (!confirm && !splitId) return;
    const req = await fetch(
      `${API}/api/post?token=${localStorage.getItem("token")}&postId=${
        splitId[2]
      }`,
      {
        method: "DELETE",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      }
    );

    const data = await req.json();
    if (!data.success) {
      alert("something went wrong");
      console.log(data.error);
      return;
    }

    document.getElementById(postId)?.remove();
  };
  return (
    <>
      <ProfileImgDiv className="profile-img-container">
        <img
          src={(profileUrl || PROFILE_IMG)+"?tr=h-60,w-60"}
          alt=""
        />
      </ProfileImgDiv>

      <ProfileInfoDiv className="profile-info-container">
        <div className="main-info">
          <h3 className="name">{name}</h3>
          <span className="status">• Following</span>
          {!imgViewer && (
            <button className="more-option-button">
              {userInfo.id === splitId[1] ? (
                <i onClick={deletePost} className="fa-solid fa-xmark remove" />
              ) : (
                <img loading="lazy" src="/images/more-option.svg" alt="" />
              )}
            </button>
          )}
        </div>
        <p className="headline">{headline || HEADLINE}</p>

        <PostTimeDiv className="time-container">
          <p className="post-date">{time}</p>
          <span className="icon">
            {" "}
            • <i className="fa-solid fa-earth-americas"></i>
          </span>
        </PostTimeDiv>
      </ProfileInfoDiv>
    </>
  );
};

export default PostHead;
