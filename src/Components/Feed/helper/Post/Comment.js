// Libraries
import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../app/slice/commentSlice";

// Styled Components
import { Container, CommentPosting, CommentArea } from "./Styles/CommentStyled";
import { EmojiIconDiv, PostCommentBtn } from "./Styles/CommentStyled";
import { ProfileImgDiv } from "./Styles/HeadStyled";

// ENV
import { API, PROFILE_IMG } from "../../../../env";

// Event Listners Functions ----------
const commentBtnEventListner = (Post, dispatch, updateFunc) => {
  const commentBtn = Post.querySelector(".post-action-comment");

  if (!commentBtn) return;
  commentBtn.addEventListener("click", () => {
    if (Post.id === "imgViewer") {
      const commentingArea = Post.querySelector(".commenting");
      commentingArea.focus();
    } else {
      const Foot = Post.querySelector(".post-foot-container");
      const commentContainer = Foot.querySelector(".comments");
      const commentingArea = commentContainer.querySelector(
        ".posting .comment-section .commenting"
      );
      commentingArea.focus();

      if (Foot.style.height !== "100%") {
        Foot.classList.add("heigh-full");
      }

      const mobileComment = document.getElementById("mob-comment-container");
      mobileComment.style.display = "block";
    }

    dispatch(update({ postId: Post.id, reply: {}, updateFunc }));
  });
};

const inputEventListner = (Post, postBtn) => {
  const comment = Post.querySelector(".posting .comment-section .commenting");

  comment.style.height = `40px`;

  // while sticking key typing
  comment.addEventListener("keydown", (e) => {
    comment.style.height = `45px`;
    postBtn(comment.value);
    comment.style.height = `${comment.scrollHeight}px`;
    postBtn(comment.value);
  });

  // select all clear
  comment.addEventListener("keyup", (e) => {
    comment.style.height = `45px`;
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

const postCommentRequest = async (
  ResDiv,
  postId,
  updateFunc,
  reply = false,
  setPostBtn
) => {
  const splitId = postId.split("-");
  const text = document
    .querySelector(`#${ResDiv} textarea.commenting`)
    .value.trim();
  if (!text) return;
  document.querySelector(`#${ResDiv} textarea.commenting`).value = "";
  setPostBtn(false);

  const convertedTxt = text.split("\n");
  if (!reply) {
    const req = await fetch(
      `${API}/api/post/comment?token=${localStorage.getItem("token")}`,
      {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: splitId[1],
          postId: splitId[2],
          text: convertedTxt,
        })
      }
    );

    const data = await req.json();
    if (!data.success) {
      alert("something went wrong");
      console.log(data.error);
    }

    const commentNum = document.querySelector(`#${ResDiv} .others .comments`);
    commentNum.innerHTML =
      parseInt(commentNum.innerHTML.split(" ")[0]) + 1 + " comments";
    await updateFunc();

    const allReplies = Array.from(
      document.querySelectorAll(`#${ResDiv} .comment-reply-clear`)
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

    const replyNum = document.querySelectorAll(`#${postId} .reply .total-reply-count`);

    for (let num of replyNum) {
      num.innerHTML = parseInt(num.innerHTML.split(" ")[0]) + 1 + " Replies";
    }
    updateFunc();
  }

  const commentingArea = document.querySelector(`#${postId} .commenting`);
  commentingArea.style.height = "41px";
  commentingArea.focus();
};

const PostComment = ({ PostId, Post, updateFunc, imgViewer }) => {
  const user = useSelector((state) => state.user);
  const [showEmoji, setShowEmoji] = useState(false);
  const [postBtn, setPostBtn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const _Post = Post ? Post : document.getElementById(imgViewer || PostId);
    inputEventListner(_Post, togglePostBtn);
    if (Post) return;
    commentBtnEventListner(_Post, dispatch, updateFunc);

    // eslint-disable-next-line
  }, []);

  const togglePostBtn = (value) => {
    if (!value) setPostBtn(false);
    else setPostBtn(true);
  };

  const onEmojiClick = (e, emojiObject) => {
    const _Post = Post ? Post : document.getElementById(imgViewer || PostId);
    const comment = _Post.querySelector(
      ".posting .comment-section .commenting"
    );

    if (comment.value === "Add a comment...") {
      comment.click();
      comment.value = emojiObject.emoji;
      togglePostBtn(comment.value);
    } else {
      comment.value += emojiObject.emoji;
    }
  };

  const displayEmojiBox = (mainEvent) => {
    const body = document.querySelector("body");
    const textBtn = mainEvent.currentTarget.parentElement;

    const checkToDisable = (e) => {
      const elementUnderTextBtn = textBtn.querySelector(
        `.${e.target.classList[0]}`
      );
      if (elementUnderTextBtn) return;
      setShowEmoji(false);
      body.removeEventListener("click", checkToDisable);
    };
    body.addEventListener("click", checkToDisable);
    setShowEmoji(true);
  };

  return (
    <Container className="post-comment">
      <CommentPosting className="posting">
        <ProfileImgDiv className="profile-img">
          <img
            src={(user.info?.profile || PROFILE_IMG) + "?tr=h-40,w-40"}
            alt=""
          />
        </ProfileImgDiv>

        <CommentArea className="comment-section">
          <textarea className="commenting" defaultValue="Add a comment..." />

          <EmojiIconDiv className="text-buttons">
            <i onClick={displayEmojiBox} className="fa-solid fa-face-smile"></i>
            <span className="emoji-box">
              {showEmoji ? <Picker onEmojiClick={onEmojiClick} /> : ""}
            </span>
          </EmojiIconDiv>
        </CommentArea>
      </CommentPosting>

      {postBtn && (
        <PostCommentBtn className="post-comment-btn">
          <button
            onClick={() =>
              postCommentRequest(
                imgViewer || PostId,
                PostId,
                updateFunc,
                Post ? true : false,
                setPostBtn
              )
            }
          >
            Post
          </button>
        </PostCommentBtn>
      )}
    </Container>
  );
};

export default PostComment;
