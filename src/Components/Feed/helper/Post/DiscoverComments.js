// Libraries
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../app/slice/commentSlice";

// Functional Components
import PostComment from "./Comment";

// Styled Components
import { CommentContainer, MainComment, ReplyingArea } from "./Styles/DiscoverCommentsStyled";
import { ReplyContainer, ReplyComment } from "./Styles/DiscoverCommentsStyled";
import { ProfileImgDiv, ProfileInfoDiv, PostTimeDiv } from "./Styles/HeadStyled";

// ENV
import { API, HEADLINE, PROFILE_IMG } from "../../../../env";

const converToText = (content) => {
  if (!content || !content.length > 0) return;
  const text = [];

  content.forEach((element) => {
    const allWords = element.split(" ");
    allWords.forEach((word) => {
      if (word.startsWith("#")) {
        text.push(
          <Link key={uuid()} className="hashtag" to={`/tags/${word.slice(1)}`}>
            {word}{" "}
          </Link>
        );
      } else {
        text.push(word + " ");
      }
    });
    text.push(<br key={uuid()} />);
  });
  return text;
};

const getUser = async (userId, userToken) => {
  const Request = await fetch(
    `${API}/api/user/basic?token=${userToken}&userId=${userId}`
  );
  const data = await Request.json();
  if (!data.success) {
    alert("something went wrong");
    console.log(data.error);
    return false;
  }

  return data.user;
};

const getReplies = async (postId, commentId, reply, page) => {
  const splitId = postId.split("-");
  const token = localStorage.getItem("token");
  const req = await fetch(
    `${API}/api/post/comment/reply?token=${token}&userId=${splitId[1]}&postId=${splitId[2]}&commentId=${commentId}&reply=${reply}&page=${page}`
  );
  const data = await req.json();

  if (!data.success) {
    return false;
  }

  const userReply = [];
  for (let reply of data.comment) {
    const user = await getUser(reply.userId, token);
    if (user) {
      userReply.push({ ...reply, user });
    }
  }

  return { reply: userReply, totalPage: data.totalPages };
};

const DiscoverComments = (props) => {
  const { PostId, comment, imgViewer } = props;
  const userInfo = useSelector((state) => state.user)?.info;
  const [replyArea, setReplyArea] = useState(false);
  const [page, setPage] = useState({ current: 0, total: 0 });
  const [reply, setReply] = useState([]);
  const splitId = PostId.split("-");
  const PostCreator = splitId[1];
  const dispatch = useDispatch();

  const focusReply = async () => {
    setReplyArea(true);
    const mobileComment = document.getElementById("mob-comment-container");
    mobileComment.style.display = "block";
    dispatch(
      update({
        postId: `${PostId}-${comment._id}`,
        reply: { name: comment.user?.uname },
        updateFunc: () => {
          requestReply(true);
        },
      })
    );
    if (reply.length < 1) {
      await requestReply();
    }

    setTimeout(() => {
      const commentArea = document.querySelector(
        `#${PostId}-${comment._id} .commenting`
      );
      commentArea.focus();
    }, 0);
  };

  const requestReply = async (reset = false) => {
    const replySize = 3;
    const res = await getReplies(
      PostId,
      comment._id,
      replySize,
      reset ? 1 : page.current + 1
    );
    if (!res) return;

    if (!reset) {
      setPage({ current: page.current + 1, total: res.totalPage });
      setReply([...reply, ...res.reply]);
    } else {
      setPage({ current: 1, total: res.totalPage });
      setReply(res.reply);
    }
  };

  const showReply = () => {
    setReplyArea(false);
    if (reply.length < 1) {
      requestReply();
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure to delete it?");
    if (!confirm) return;
    if (imgViewer) {
      const commentNum = document.querySelector(
        `#${imgViewer || PostId} .others .comments`
      );
      commentNum.innerHTML =
        parseInt(commentNum.innerHTML.split(" ")[0]) - 1 + " comments";
    }
    const commentNum = document.querySelector(`#${PostId} .others .comments`);
    commentNum.innerHTML =
      parseInt(commentNum.innerHTML.split(" ")[0]) - 1 + " comments";

    const req = await fetch(
      `${API}/api/post/comment?token=${localStorage.getItem("token")}&postId=${
        splitId[2]
      }&commentId=${comment._id}&userId=${PostCreator}`,
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
    document.getElementById(`${PostId}-${comment._id}`)?.remove();
  };

  const deleteReply = async (replyId) => {
    const confirm = window.confirm("Are you sure to delete it?");
    if (!confirm) return;

    const allOccurence = Array.from(
      document.querySelectorAll(`#${PostId}-${comment._id}-${replyId}`)
    );

    for (let occur of allOccurence) {
      const commentElem = occur?.parentElement?.parentElement;
      if (!commentElem) return;
      const replyCount = commentElem.querySelector(".reply .total-reply-count");
      if (!replyCount) return;
      const prvCount = parseInt(replyCount.innerText.split(" ")[0]);
      replyCount.innerText = `${prvCount - 1} Replies`;
    }

    const req = await fetch(
      `${API}/api/post/comment/reply?token=${localStorage.getItem(
        "token"
      )}&postId=${splitId[2]}&commentId=${
        comment._id
      }&userId=${PostCreator}&replyId=${replyId}`,
      {
        method: "DELETE",
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      }
    );

    const data = await req.json();
    if (!data.success) {
      alert("something went wrong");
      console.log(data.error);
      return;
    }

    requestReply(true);
  };

  return (
    <CommentContainer id={`${PostId}-${comment._id}`}>
      <div
        className="comment-reply-clear"
        onClick={() => {
          setReply([]);
          setPage({ current: 0, total: 0 });
        }}
      />
      <MainComment className="comment-item">
        <ProfileImgDiv className="profile-img-container">
          <img
            src={(comment.user?.profileImg || PROFILE_IMG)+"?tr=h-40,w-40"}
            alt=""
          />
        </ProfileImgDiv>

        <ProfileInfoDiv className="profile-info-container">
          <div className="main-info">
            <h3 className="name">{comment.user?.uname}</h3>
            {PostCreator === comment.user?._id && (
              <h3 className="name author-name">Author</h3>
            )}
            <PostTimeDiv className="time-container">
              <p className="post-date">2D</p>
            </PostTimeDiv>
            <button className="more-option-button">
              {userInfo.id === comment.userId ? (
                <i
                  onClick={deleteComment}
                  className="fa-solid fa-xmark remove"
                />
              ) : (
                <img loading="lazy" src="/images/more-option.svg" alt="" />
              )}
            </button>
          </div>
          <p className="headline">{comment.user?.headline}</p>
          <p className="content">{converToText(comment.text)}</p>

          <ReplyingArea className="reply">
            <button>
              <p className="btn-text" onClick={focusReply}>
                reply
              </p>
            </button>

            <span className="reply-divider">•</span>
            <p className="total-reply-count" onClick={showReply}>
              {comment.totalReplies} Replies
            </p>
          </ReplyingArea>
        </ProfileInfoDiv>
      </MainComment>

      <ReplyContainer>
        {reply?.map((r) => {
          return (
            <ReplyComment key={uuid()} id={`${PostId}-${comment._id}-${r._id}`}>
              <ProfileImgDiv className="profile-img-container">
                <img
                  src={(r.user?.profileImg || PROFILE_IMG)+"?tr=h-40,w-40"}
                  alt=""
                />
              </ProfileImgDiv>

              <ProfileInfoDiv className="profile-info-container">
                <div className="main-info">
                  <h3 className="name">{r.user?.uname}</h3>
                  {PostCreator === r.user?._id && (
                    <h3 className="name author-name">Author</h3>
                  )}
                  <PostTimeDiv className="time-container">
                    <p className="post-date">4D</p>
                  </PostTimeDiv>
                  <button className="more-option-button">
                    {userInfo.id === r.user?._id ? (
                      <i
                        onClick={() => deleteReply(r._id)}
                        className="fa-solid fa-xmark remove"
                      />
                    ) : (
                      <img
                        loading="lazy"
                        src="/images/more-option.svg"
                        alt=""
                      />
                    )}
                  </button>
                </div>
                <p className="headline">{r.user?.headline || HEADLINE}</p>
                <p className="content">{converToText(r.text)}</p>
              </ProfileInfoDiv>
            </ReplyComment>
          );
        })}

        {page.current !== page.total && (
          <button onClick={() => requestReply()} className="show-more-replies">
            show more replies
          </button>
        )}
        {replyArea && (
          <PostComment
            PostId={`${PostId}-${comment._id}`}
            Post={document.querySelector(`#${PostId}-${comment._id}`)}
            updateFunc={() => {
              requestReply(true);
            }}
          />
        )}
      </ReplyContainer>
    </CommentContainer>
  );
};

export default DiscoverComments;
