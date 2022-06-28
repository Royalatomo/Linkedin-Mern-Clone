// Libraries
import React, { useEffect, useState } from "react";

// Functional Component
import Post from "./Post/Main";
import { API, LOADING_GIF } from "../../../env";

// Styled Component
import { Container, PostContainer } from "../Styles/ExplorePostStyled";

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

const getPost = async (post, page, thisUser = false) => {
  const userToken = localStorage.getItem("token");
  const Request = await fetch(
    `${API}/api/${thisUser ? "post" : "user/feed"
    }?token=${userToken}&post=${post}&page=${page}`
  );

  const data = await Request.json();
  if (!data.success) {
    return false;
  }

  const posts = [];
  if (!thisUser) {
    for (let i of data.post) {
      const Request = await fetch(
        `${API}/api/post/one?token=${userToken}&userId=${i._id}&postId=${i.post}`
      );
      const data = await Request.json();
      if (!data.success) {
        alert("something went wrong");
        console.log(data.error);
        return false;
      }

      const user = await getUser(i._id, userToken);
      posts.push({ ...data.post, user });
    }
  } else {
    const user = await getUser(data.userId, userToken);
    for(let i of data.post) {
      posts.push({ ...i, user });
    }
  }

  return { posts, totalPages: data.totalPages };
};

const ExplorePost = ({thisUser}) => {
  const [page, setPage] = useState({ current: 0, totalPage: 0 });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const showPost = async () => {
    setLoading(true)
    const postSize = 3;
    const res = await getPost(postSize, page.current + 1, thisUser === true);
    
    if (!res) {
      setLoading(false)
      return;
    }
    setPage({ current: page.current + 1, totalPage: res.totalPages });
    setPosts([...posts, ...res.posts]);
    setLoading(false)
  };

  useEffect(() => {
    showPost();

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <PostContainer>
        {/* First Post */}
        {posts.map((post) => {
          const uniqId = `post-${post.user._id}-${post._id}`;
          return (
            <Post
              id={uniqId}
              headline={post.user.headline}
              name={post.user.uname}
              profileUrl={post.user.profileImg}
              post={post}
              key={uniqId}
            />
          );
        })}

        {!loading && page.current !== page.totalPage && (
          <button className="show-more" onClick={showPost}>
            show more
          </button>
        )}

        {loading && <img className="loading" src={LOADING_GIF+"?tr=h-40,w-50"} alt="" />}
      </PostContainer>
    </Container>
  );
};

export default ExplorePost;
