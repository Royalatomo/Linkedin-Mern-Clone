// Libraries
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { update } from "../../../../app/slice/viewerSlice";

// Functional Components
import PostHead from "./Head";
import PostText from "./Text";
import PostMedia from "./Media";
import PostInfo from "./Info";
import PostAction from "./Action";
import PostComment from "./Comment";
import DiscoverComments from "./DiscoverComments";

// Styled Components
import { Post, Head, Body, Foot } from "./Styles/MainStyled";

// ENV
import { API } from "../../../../env";

// Display ImageViewer after updating --- (Func)
const imgViewerVisible = (props, position) => {
  const imgViewer = document.querySelector("#imgViewer");
  if (!imgViewer) return;
  imgViewer.style.display = "flex";

  // if called on first media (hide left btn)
  if (position === 0) {
    const leftSlide = imgViewer.querySelector(".controls .left-slide");
    leftSlide.classList.add("disableControl");
  }

  // if called on last media (hide right btn)
  if (position === props.post.postImgs?.length - 1) {
    const rightSlide = imgViewer.querySelector(".controls .right-slide");
    rightSlide.classList.add("disableControl");
  }

  // fixing background
  const Y_Axis = window.scrollY;
  document.body.style.position = `fixed`;
  document.body.style.top = `-${Y_Axis}px`;
};

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

// Main Post Container --- (Comp)
const SinglePost = (props) => {
  const { id, profileUrl, name, headline, post } = props;
  const dispatch = useDispatch();

  const [page, setPage] = useState({ current: 0, total: 0 });
  const [comments, setComments] = useState([]);

  async function showMore(reset=false) {
    const commentSize = 3;
    const res = await getComment(post.user._id, post._id, commentSize, reset?1:page.current+1);
    if (!res) return;

    if(!reset) {
      setPage({current: page.current+1, total: res.totalPages});
      setComments([...comments, ...res.comments]);
    }else {
      setPage({current: 1, total: res.totalPages});
      setComments(res.comments);
    }
  }

  // ImgViewer will get updated on media click
  function updateImgViewer(position) {
    const viewerObject = { userId: post.user._id, postId: post._id, initialPosition: position, show: true };
    showMore(true);
    dispatch(update(viewerObject));

    setTimeout(() => {
      imgViewerVisible(props, position);
    }, 0);
  }

  useEffect(() => {
    showMore()

    // eslint-disable-next-line
  }, [])

  return (
    <Post id={id}>
      <Head>
        <PostHead
          profileUrl={profileUrl}
          name={name}
          headline={headline}
          time="4D"
          postId={id}
        />
      </Head>

      <Body>
        <PostText content={post.text} id={id} />
        <PostMedia
          media={post.postImgs}
          updateImgViewer={updateImgViewer}
          postId={id}
        />
        <PostInfo
          action={{ totalActions: post.totalActions, ...post.action }}
          comments={post.totalComments}
          shares={post.action.share}
        />
      </Body>

      {/* show already action done */}
      <Foot className="post-foot-container">
        <div className="buttons">
          <PostAction PostId={id} action={post.action} />
        </div>

        <div className="comments">
          <PostComment updateFunc={async () => await showMore(true)} PostId={id} />
        </div>

        <div className="discover-comments">
        {comments.length>0 && comments.map((item, index) => {
            return (
              <DiscoverComments
                key={index}
                PostId={props.id}
                comment={item}
              />
            );
          })}
          {page.current !== page.total && <button className="comment-show-more" onClick={() => showMore()}>show more</button>}
        </div>
      </Foot>
    </Post>
  );
};

export default SinglePost;
