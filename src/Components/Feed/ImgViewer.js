// Libraries
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../app/slice/viewerSlice";

// Functional Components
import PostHead from "./helper/Post/Head";
import PostText from "./helper/Post/Text";
import PostInfo from "./helper/Post/Info";
import PostAction from "./helper/Post/Action";
import DiscoverComments from "./helper/Post/DiscoverComments";
import PostComment from "./helper/Post/Comment";

// Styled Components
import {Container, ImgViewingArea, InteractionArea } from "./Styles/ImgViewerStyled";
import { Holder, ViewerHead, ViewerBody, ViewerFoot} from "./Styles/ImgViewerStyled";

// ENV
import { API, PROFILE_IMG } from "../../env";

const getUser = async (userId, userToken) => {
  const Request = await fetch(`${API}/api/user/basic?token=${userToken}&userId=${userId}`);
  const data = await Request.json();
  if (!data.success) {
    alert("something went wrong");
    console.log(data.error);
    return false;
  }

  return data.user;
};

const getComment = async (userId, postId, comment, page) => {
  const userToken = localStorage.getItem("token");
  const Request = await fetch(
    `${API}/api/post/comment?token=${userToken}&userId=${userId}&postId=${postId}&page=${page}&comment=${comment}`
  );

  const data = await Request.json();
  if (!data.success) {
    return false;
  }

  const comments = [];
  for (let i of data.comment) {
    const user = await getUser(i.userId, userToken);
    comments.push({ ...i, user });
  }

  return { comments, totalPages: data.totalPages };
};

const getPost = async (userId, postId) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`${API}/api/post/one?token=${token}&postId=${postId}&userId=${userId}`);
  const data = await req.json();
  if (!data.success) {
    alert("something went wrong");
    console.log(data.error);
    return false;
  }

  return { post: data.post, user: await getUser(userId, token) };
};

const freeScroll = () => {
  const Y_Axis = document.body.style.top.replace("px", "");
  document.body.style.position = `relative`;
  if (!Y_Axis) return;
  window.scrollTo(0, Y_Axis * -1);
  document.body.style.top = ``;
};

const makeCloseBtnWork = (imgViewer, dispatch, setPostInfo) => {
  const closeBtn = imgViewer.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    dispatch(update({ show: false }));
    setPostInfo({ post: [], user: [] });
    freeScroll();
  });
};

const backgroundClickClose = (imgViewer, dispatch, setPostInfo) => {
  imgViewer.addEventListener("click", (e) => {
    if (!(e.target.id === "imgViewer")) return;
    dispatch(update({ show: false }));
    setPostInfo({ post: [], user: [] });
    freeScroll();
  });
};

const ImgViewer = () => {
  const viewer = useSelector((state) => state.viewer);
  const [postInfo, setPostInfo] = useState();
  const [currentItem, setCurrentItem] = useState(viewer.initialPosition);
  const ImgViewerID = "imgViewer";
  const [page, setPage] = useState({ current: 0, total: 0 });
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  const setInfo = async () => {
    const res = await getPost(viewer.userId, viewer.postId);
    if (!res) return;
    setPostInfo(res);
  };

  useEffect(() => {
    const imgViewer = document.getElementById(ImgViewerID);
    if (!imgViewer) return;
    setInfo();
    showMore(true);
    makeCloseBtnWork(imgViewer, dispatch, setPostInfo);
    backgroundClickClose(imgViewer, dispatch, setPostInfo);
    imgViewer.querySelector(".viewing-area")?.removeAttribute("data-showed");

    const allReplies = Array.from(
      document.querySelectorAll(`#post-${viewer.userId}-${viewer.postId} .comment-reply-clear`)
    );

    allReplies.forEach((rep) => rep.click());

    // eslint-disable-next-line
  }, [viewer]);

  const visibleImg = (e = false) => {
    if (e?.currentTarget?.dataset.showed) return;
    if (postInfo.post?.postImgs?.length > 0) {
      initializeImg(viewer.initialPosition);
      setCurrentItem(viewer.initialPosition);
    }
    if (e?.currentTarget) {
      e.currentTarget.setAttribute("data-showed", true);
    }
  };

  const initializeImg = (position = currentItem) => {
    // check if controls should disable
    if (position === 0) {
      const leftSlide = document.querySelector("#imgViewer .controls .left-slide");
      leftSlide.classList.add("disableControl");
    }

    if (position === postInfo.post?.postImgs?.length - 1) {
      const rightSlide = document.querySelector("#imgViewer .controls .right-slide");
      rightSlide.classList.add("disableControl");
    }

    // Images Element present in viewer
    const allImgs = Array.from(document.querySelectorAll("#imgViewer .img-viewer-item"));

    if (!allImgs) return;

    // Remove active Image elements
    const allActiveImgs = Array.from(document.querySelectorAll("#imgViewer .active-img"));
    allActiveImgs.forEach((img) => {
      img.classList.remove("active-img");
    });

    // make current-img position element visible
    allImgs[position].classList.add("active-img");
    setCurrentItem(position);
  };

  async function showMore(reset = false) {
    const commentSize = 3;
    const res = await getComment(
      viewer.userId,
      viewer.postId,
      commentSize,
      reset ? 1 : page.current + 1
    );
    if (!res) return;

    if (!reset) {
      setPage({ current: page.current + 1, total: res.totalPages });
      setComments([...comments, ...res.comments]);
    } else {
      setPage({ current: 1, total: res.totalPages });
      setComments(res.comments);
    }
  }

  // Next-Btn Image-Viewer Control
  const nextImg = (e) => {
    // Disable Next-Btn (Logic)
    if (currentItem === postInfo?.post.postImgs?.length - 1) return;

    // Disable Next-Btn (Front-End)
    if (currentItem + 1 === postInfo?.post.postImgs?.length - 1) {
      e.currentTarget.classList.add("disableControl");
    }

    // Enable Prv-Btn (if disabled)
    document
      .querySelector("#imgViewer .controls .left-slide")
      .classList.remove("disableControl");

    // Change Visible Image
    initializeImg(currentItem + 1);
  };

  // Previous-Btn Image-Viewer Control
  const prvImg = (e) => {
    // Disable Prv-Btn (Logic)
    if (currentItem === 0) return;

    // Disable Next-Btn (Front-End)
    if (currentItem - 1 === 0) {
      e.currentTarget.classList.add("disableControl");
    }

    // Enable Prv-Btn (if disabled)
    document
      .querySelector("#imgViewer .controls .right-slide")
      .classList.remove("disableControl");

    // Change Visible Image
    initializeImg(currentItem - 1);
  };

  const improveQuality = (e) => {
    const img = e.currentTarget;
    if (img.dataset.quality) return;
    img.src = img.src.replace("?tr=w-20,h-20,q-10", "");
    img.setAttribute("data-quality", true);
    img.setAttribute("loading", "lazy");
  };

  if (!viewer.show) return;

  return (
    <Container className="img-viewer" id="imgViewer">
      <Holder>
        <ImgViewingArea onLoad={visibleImg} className="viewing-area">
          {(postInfo?.post?.postImgs || []).map((img, key) => {
            return (
              <img
                src={img + "?tr=w-20,h-20,q-10"}
                key={key}
                alt=""
                className="img-viewer-item"
                onLoad={improveQuality}
              />
            );
          })}

          <div className="controls">
            <i
              onClick={prvImg}
              className="left-slide fa-solid fa-chevron-left"
            ></i>
            <i
              onClick={nextImg}
              className="right-slide fa-solid fa-chevron-right"
            ></i>
          </div>
        </ImgViewingArea>

        <InteractionArea>
          <ViewerHead>
            <PostHead
              imgViewer={true}
              profileUrl={(postInfo?.user?.profileImg || PROFILE_IMG)+"?tr=h-40,w-40"}
              name={postInfo?.user?.uname}
              headline={postInfo?.user?.headline}
              time="4D"
            />
            <i className="fa-solid fa-xmark close-btn"></i>
          </ViewerHead>

          <ViewerBody>
            <PostText imgViewer={true} content={postInfo?.post?.text} />

            <PostInfo
              action={{
                totalActions: postInfo?.post?.totalActions,
                ...(postInfo || []).post?.action,
              }}
              comments={postInfo?.post?.totalComments}
              shares={0}
            />
          </ViewerBody>

          <ViewerFoot>
            <div className="buttons">
              <PostAction
                PostId={`post-${viewer.userId}-${viewer.postId}`}
                imgViewer="imgViewer"
                action={postInfo?.post?.action}
              />
            </div>

            <div className="comments">
              <PostComment
                updateFunc={async () => await showMore(true)}
                imgViewer="imgViewer"
                PostId={`post-${viewer.userId}-${viewer.postId}`}
              />
            </div>

            <div className="discover-comments">
              {comments?.map((item, index) => {
                return (
                  <DiscoverComments
                    key={index}
                    PostId={`post-${viewer.userId}-${viewer.postId}`}
                    comment={item}
                    imgViewer="imgViewer"
                  />
                );
              })}
              {page.current !== page.total && (
                <button
                  className="comment-show-more"
                  onClick={() => showMore()}
                >
                  show more
                </button>
              )}
            </div>
          </ViewerFoot>
        </InteractionArea>
      </Holder>
    </Container>
  );
};

export default ImgViewer;
