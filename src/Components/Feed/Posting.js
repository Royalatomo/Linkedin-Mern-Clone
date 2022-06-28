// Libraries
import React from "react";

// Functional Components
import SharePost from "./helper/SharePost";
import ExplorePost from "./helper/ExplorePost";

// Styled Componets
import { Container } from "./Styles/PostingStyle";

const Posting = ({thisUser}) => {
  // const width = useSelector((state) => state.width);
  return (
    <Container>
      {!thisUser?<SharePost />:""}
      <ExplorePost thisUser={thisUser}/>
    </Container>
  );
};

export default Posting;
