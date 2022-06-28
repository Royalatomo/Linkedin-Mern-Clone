// Library
const { validate } = require("email-validator");

// Schema
const Users = require("../schema/users");

// Getuser based on email/username
const getUser = async (str) => {
  // if email
  if (validate(str)) {
    try {
      const user = await Users.findOne({ email: str });
      return user;
    } catch (error) {
      return false;
    }
  }

  // if username
  else {
    try {
      const user = await Users.findOne({ uname: str });
      return user;
    } catch (error) {
      return false;
    }
  }
};

const binarySearch = (posts, id) => {
  const totalPosts = posts.length;

  if (totalPosts === 0) {
    return false;
  }

  if (totalPosts === 1) {
    if (parseInt(posts[0]._id) === id) {
      return posts[0];
    }
    return false;
  }

  const midIndex = Math.floor(totalPosts / 2);
  const midVal = posts[midIndex];
  if (midVal._id === id) {
    return midVal;
  }

  const left = posts.slice(0, midIndex);
  const right = posts.slice(midIndex + 1, totalPosts);

  if (parseInt(midVal._id) < id) {
    return binarySearch(left, id);
  } else {
    return binarySearch(right, id);
  }
};

const binaryUpdateComment = (postCom, postId, newComments, initial = true) => {
  const totalPosts = postCom.length;

  if (totalPosts === 0) {
    return postCom;
  }

  if (totalPosts === 1) {
    if (parseInt(postCom[0]._id) === postId) {
      if (initial) {
        return [{ ...postCom[0], comments: newComments }];
      }
      return { ...postCom[0], comments: newComments };
    }

    if (initial) {
      return [postCom];
    }
    return postCom;
  }

  const midIndex = Math.floor(totalPosts / 2);
  const midVal = postCom[midIndex];
  const left = postCom.slice(0, midIndex);
  let right = [];

  if (midVal._id === postId) {
    right = postCom.slice(midIndex + 1, totalPosts);
    return [...left, { ...midVal, comments: newComments }, ...right];
  }
  right = postCom.slice(midIndex, totalPosts);

  if (parseInt(midVal._id) < postId) {
    const leftSide = binaryUpdateComment(left, postId, newComments, false);
    if (!leftSide.length) {
      return [leftSide, ...right];
    }
    return leftSide.concat(right);
  } else {
    return left.concat(binaryUpdateComment(right, postId, newComments, false));
  }
};

const binaryReply = (comments, id, newReplies, initial = true) => {
  const totalPosts = comments.length;

  if (totalPosts === 0) {
    return [comments];
  }

  if (totalPosts === 1) {
    
    if (parseInt(comments[0]._id) === id) {
      if (initial) return [{ ...comments[0], reply: newReplies }];
      return { ...comments[0], reply: newReplies };
    }
    if (initial) return [comments[0]];
    return comments[0];
  }

  const midIndex = Math.floor(totalPosts / 2);
  const midVal = comments[midIndex];
  const left = comments.slice(0, midIndex);
  let right = [];

  if (midVal._id === id) {
    right = comments.slice(midIndex + 1, totalPosts);
    return [...left, { ...midVal, reply: newReplies }, ...right];
  }
  right = comments.slice(midIndex, totalPosts);

  if (parseInt(midVal._id) < id) {
    const leftSide = binaryReply(left, id, newReplies, false);
    if (!leftSide.length) {
      return [leftSide, ...right];
    }
    return leftSide.concat(right);
  } else {
    return left.concat(binaryReply(right, id, newReplies, false));
  }
};

const binaryUpdateReply = (
  postCom,
  postId,
  commentId,
  newReplies,
  initial = true
) => {
  const totalPosts = postCom.length;

  if (totalPosts === 0) {
    return postCom;
  }

  if (totalPosts === 1) {
    if (parseInt(postCom[0]._id) === parseInt(postId)) {
      const newComment = binaryReply(postCom[0].comments, parseInt(commentId), newReplies);
      if (initial) {
        return [{ ...postCom[0], comments: newComment }];
      }
      return { ...postCom[0], comments: newComment };
    }

    if (initial) {
      return [postCom];
    }
    return postCom;
  }

  const midIndex = Math.floor(totalPosts / 2);
  const midVal = postCom[midIndex];
  const left = postCom.slice(0, midIndex);
  let right = [];

  if (parseInt(midVal._id) === parseInt(postId)) {
    right = postCom.slice(midIndex + 1, totalPosts);
    const middleArea = binaryReply(midVal.comments, parseInt(commentId), newReplies);
    return [...left, { ...midVal, comments: middleArea }, ...right];
  }
  right = postCom.slice(midIndex, totalPosts);

  if (parseInt(midVal._id) < parseInt(postId)) {
    const leftSide = binaryUpdateReply(left, postId, commentId, newReplies, false);
    if (!leftSide.length) {
      return [leftSide, ...right];
    }
    return leftSide.concat(right);
  } else {
    const rightSide = binaryUpdateReply(right, postId, commentId, newReplies, false);
    return left.concat(rightSide);
  }
};

module.exports = {
  getUser,
  binarySearch,
  binaryUpdateComment,
  binaryUpdateReply,
};
