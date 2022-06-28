// Libraries
import React, { useEffect } from "react";

// Styled Components
import { ActionBtn, LikeOptions } from "./Styles/ActionStyled";

// ENV
import { API } from "../../../../env";

// Reaction Count (Increase/Descrease) -- (Func)
const updateCount = (PostId, add = true) => {
  const Post = document.getElementById(PostId);
  if (!Post) return;
  const reactionCount = Post.querySelector(".reaction .count");
  reactionCount.innerText = +reactionCount.innerText + (add ? 1 : -1);
};

// On Reaction click - adding reaction -- (Func)
const triggerReaction = async (action, e, PostId, ReactionDiv, initial = false) => {
  const Post = document.getElementById(ReactionDiv);
  const target = initial ? e : e.currentTarget;
  if (!Post) return;
  const postLikeButton = Post.querySelector(".like-btn");
  const btnText = postLikeButton.querySelector("span");

  // changing btn id & text to match with the reaction
  postLikeButton.id = btnText.innerText = target.id;
  btnText.style.color = target.style.color;

  // changing button looks
  const postLikeButtonIcon = postLikeButton.children[0];
  postLikeButtonIcon.outerHTML = target.outerHTML;

  if (!initial) {
    // Add Count
    updateCount(ReactionDiv);
    await addActionRequest(PostId, target.id);
    await resetInfo(action, ReactionDiv, target.id);

    if (ReactionDiv === "imgViewer"){
      const realLike = document.querySelector(`#${PostId} .post-foot-container .like-btn`);
      const realInfo = document.querySelector(`#${PostId} .others .reaction`);

      const viewerLike = document.querySelector("#imgViewer .buttons .like-btn");
      const viewerInfo = document.querySelector("#imgViewer .others .reaction");
      
      realInfo.outerHTML = viewerInfo.outerHTML;
      realLike.children[0].outerHTML = viewerLike.children[0].outerHTML;
      realLike.querySelector("span").innerText = viewerLike.querySelector("span").innerText;
      realLike.setAttribute("id", viewerLike.id);
    }
  }
};

const resetInfo = async (action, postId, op, add = true) => {
  const element = document.querySelector(`#${postId} .others .reaction .emoji`);
  const postAction = await action();
  let innerHTML = "";

  postAction[op] = add ? postAction[op] + 1 : postAction[op] - 1;

  for (let i of Object.keys(postAction)) {
    if (parseInt(postAction[i]) > 0) {
      innerHTML += document.querySelector(".show-like-options #" + i).outerHTML;
    }
  }

  element.innerHTML = innerHTML;
};

const addActionRequest = async (PostId, option) => {
  const splitId = PostId.split("-");
  const Request = await fetch(
    `${API}/api/post/action?token=${localStorage.getItem("token")}`,
    {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ userId: splitId[1], postId: splitId[2], option }),
    }
  );
  const data = await Request.json();
  if (!data.success) {
    alert("something went wrong");
    console.log(data.error);
  }
};

const removeActionRequest = async (PostId) => {
  const splitId = PostId.split("-");
  const Request = await fetch(
    `${API}/api/post/action?token=${localStorage.getItem("token")}&userId=${
      splitId[1]
    }&postId=${splitId[2]}`,
    {
      method: "DELETE",
    }
  );
  const data = await Request.json();
  if (!data.success) {
    alert("something went wrong");
    console.log(data.error);
  }
};

// Adds EventListners to likeButton Div
const likeBtnEvents = (ReactionDiv, action, PostId) => {
  const Post = document.getElementById(ReactionDiv);
  if (!Post) return;
  const postLikeButton = Post.querySelector(".like-btn");

  // remove reaction - if reacted
  postLikeButton.addEventListener("click", async () => {
    if (!postLikeButton.id) return;
    const rmId = postLikeButton.id;
    postLikeButton.removeAttribute("id");

    // Change likeButton Text and Icon To Default
    const postLikeButtonIcon = postLikeButton.children[0];
    postLikeButtonIcon.outerHTML = `<i class="fa-solid fa-thumbs-up"></i>`; // icon
    postLikeButton.querySelector("span").innerText = "like"; // text
    await removeActionRequest(PostId, rmId);
    // Remove Count
    updateCount(ReactionDiv, false);
    // action[rmId] -= 1;
    await resetInfo(action, ReactionDiv, rmId, false);

    if (ReactionDiv === "imgViewer"){
      const realLike = document.querySelector(`#${PostId} .post-foot-container .like-btn`);
      const realInfo = document.querySelector(`#${PostId} .others .reaction`);

      const viewerLike = document.querySelector("#imgViewer .buttons .like-btn");
      const viewerInfo = document.querySelector("#imgViewer .others .reaction");
      
      realInfo.outerHTML = viewerInfo.outerHTML;
      realLike.children[0].outerHTML = viewerLike.children[0].outerHTML;
      realLike.querySelector("span").innerText = viewerLike.querySelector("span").innerText;
      realLike.removeAttribute("id");
    }
  });

  // onHover show all reaction to add - if not added
  postLikeButton.addEventListener("mouseover", (e) => {
    if (postLikeButton.id) return;

    const showOptions = postLikeButton.querySelector(".show-like-options");
    if (!showOptions) return;

    showOptions.classList.add("show-options-active");
    Array.from(showOptions.children).forEach((child) => {
      child.addEventListener("click", () => {
        showOptions.classList.remove("show-options-active");
      });
    });
  });

  // onHover-leave hide all reaction options - if not added
  postLikeButton.addEventListener("mouseleave", (e) => {
    if (postLikeButton.id) return;
    const showOptions = postLikeButton.querySelector(".show-like-options");
    showOptions.classList.remove("show-options-active");
  });
};

// Main Component -- (Comp)
const PostAction = (props) => {
  const { PostId, imgViewer } = props;
  const splitId = PostId.split("-");

  const getAction = async () => {
    const Request = await fetch(
      `${API}/api/post/one?token=${localStorage.getItem("token")}&postId=${splitId[2]}&userId=${splitId[1]}`
    );

    const data = await Request.json();
    if (!data.success) {
      return false;
    }

    return data.post.action
  }

  const getUserAction = async () => {
    const Request = await fetch(
      `${API}/api/post/action?token=${localStorage.getItem("token")}&userId=${
        splitId[1]
      }&postId=${splitId[2]}`
    );
    
    const data = await Request.json();
    if (!data.success) {
      return false;
    }

    const target = document.querySelector(`#${imgViewer || PostId} #${data.action}`);
    triggerReaction(getAction, target, PostId, imgViewer || PostId, true);
  };
  
  useEffect(() => {
    likeBtnEvents(imgViewer || PostId, getAction, PostId);
    getUserAction();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ActionBtn className="post-action-btn like-btn" id="">
        <i className="fa-solid fa-thumbs-up"></i>
        <span>Like</span>
        <LikeOptions className="show-like-options">
          <i
            id="like"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            className="fa-solid fa-thumbs-up"
          ></i>
          <i
            id="celebrate"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            className="fa-solid fa-hands-clapping"
          ></i>
          <i
            id="support"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            className="fa-solid fa-hand-holding-heart"
          ></i>
          <i
            id="love"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            className="fa-solid fa-heart"
          ></i>
          <i
            id="insightful"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            className="fa-solid fa-lightbulb"
          ></i>
          <img
            id="curious"
            className="curious"
            onClick={(e) => triggerReaction(getAction, e, PostId, imgViewer || PostId)}
            src="/images/thinking-emoji.svg"
            alt=""
          />
        </LikeOptions>
      </ActionBtn>

      <ActionBtn className="post-action-btn post-action-comment">
        <img src="/images/post-comment.svg" alt="" />
        <span>Comment</span>
      </ActionBtn>

      <ActionBtn className="post-action-btn">
        <img src="/images/post-share.svg" alt="" />
        <span>Share</span>
      </ActionBtn>

      <ActionBtn className="post-action-btn">
        <img src="/images/post-send.svg" alt="" />
        <span>Send</span>
      </ActionBtn>
    </>
  );
};

export default PostAction;
