// Libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // redux

// Functional Components
import { MobContainer } from "./Styles/MobCommentStyled";

// Styled Components
import { CommentPosting, PostCommentBtn, CloseBtn } from "./helper/Post/Styles/CommentStyled";
import { ProfileImgDiv } from "./helper/Post/Styles/HeadStyled";

// ENV
import { API, PROFILE_IMG } from "../../env";

const inputEventListner = (Post, postBtn) => {
  const comment = Post.querySelector(".comment-section .commenting");

  comment.style.height = `20px`;

  // while sticking key typing
  comment.addEventListener("keydown", (e) => {
    comment.style.height = `20px`;
    postBtn(comment.value);
    comment.style.height = `${comment.scrollHeight}px`;
    postBtn(comment.value);
  });

  // select all clear
  comment.addEventListener("keyup", (e) => {
    comment.style.height = `20px`;
    postBtn(comment.value);
    comment.style.height = `${comment.scrollHeight}px`;
    postBtn(comment.value);
  });

  comment.addEventListener("focusin", (e) => {
    if (e.currentTarget.value !== "Add a comment...") return;
    e.currentTarget.value = "";
  });

  comment.addEventListener("focusout", (e) => {
    if (e.currentTarget.value !== "") return;
    e.currentTarget.value = "Add a comment...";
  });
};

export const CommentForMob = () => {
  const userInfo = useSelector((state) => state.user)?.info;
  const [postBtn, setPostBtn] = useState(false);
  const commentText = useSelector((state) => state.comment);

  useEffect(() => {
    const Post = document.getElementById("mob-comment-container");
    if (!Post) return;
    inputEventListner(Post, togglePostBtn);
  }, []);

  const togglePostBtn = (value) => {
    if (!value) setPostBtn(false);
    else setPostBtn(true);
  };

  const clearComment = () => {
    const Container = document.getElementById("mob-comment-container");
    Container.style.display = "none";
    const comment = Container.querySelector(".commenting");
    comment.value = "Add a comment...";
    comment.style.height = `20px`;
    setPostBtn(false);
  };

  const postComment = async () => {
    const splitId = commentText.postId.split("-");
    const text = document
      .querySelector("#mob-comment-container textarea.commenting")
      .value.trim();
    if (!text) return;
    document.querySelector("#mob-comment-container textarea.commenting").value =
      "";
    setPostBtn(false);
    const convertedTxt = text.split("\n");
    clearComment();

    if (splitId.length === 3) {
      const req = await fetch(
        `${API}/api/post/comment?token=${localStorage.getItem("token")}`,
        {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: splitId[1],
            postId: splitId[2],
            text: convertedTxt,
          }),
        }
      );

      const data = await req.json();
      if (!data.success) {
        alert("something went wrong");
        console.log(data.error);
      }

      const commentNum = document.querySelector(
        `#${commentText.postId} .others .comments`
      );
      commentNum.innerHTML =
        parseInt(commentNum.innerHTML.split(" ")[0]) + 1 + " comments";
      await commentText.updateFunc();

      const allReplies = Array.from(
        document.querySelector(`#${commentText.postId} .comment-reply-clear`)
      );
      allReplies.forEach((rep) => rep.click());
    } else {
      const req = await fetch(
        `${API}/api/post/comment/reply?token=${localStorage.getItem("token")}`,
        {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: splitId[1],
            postId: splitId[2],
            commentId: splitId[3],
            text: convertedTxt,
          }),
        }
      );

      const data = await req.json();
      if (!data.success) {
        alert("something went wrong");
        console.log(data.error);
      }

      const replyNum = document.querySelector(
        `#${commentText.postId} .reply .total-reply-count`
      );
      if (replyNum) {
        replyNum.innerHTML =
          parseInt(replyNum.innerHTML.split(" ")[0]) + 1 + " Replies";
      }
    }
    commentText.updateFunc();
  };

  return (
    <MobContainer id="mob-comment-container">
      {commentText.reply?.name && (
        <div className="reply-posting">
          Replying To <strong>{commentText.reply.name}</strong>
        </div>
      )}
      <CommentPosting className="posting">
        <ProfileImgDiv className="profile-img">
          <img
            src={(userInfo.profile || PROFILE_IMG)+"?tr=w-100,h-100"}
            alt=""
          />
        </ProfileImgDiv>

        <div className="comment-section">
          <textarea className="commenting" defaultValue="Add a comment..." />

          <PostCommentBtn className="post-comment-btn">
            <button onClick={postComment} style={{ color: postBtn?"#0a66c2":"gray" }}>Post</button>
          </PostCommentBtn>
        </div>

        <CloseBtn className="fa-solid fa-xmark close-btn" onClick={clearComment} />
      </CommentPosting>
    </MobContainer>
  );
};

export default CommentForMob;
