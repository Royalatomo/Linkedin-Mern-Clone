// Libraries
import React from "react";

// Styled Components
import { Container, InfoReaction } from "./Styles/InfoStyled";

const PostInfo = (props) => {
  const { action, comments, shares } = props;

  return (
    <Container className="others">
      <InfoReaction className="reaction">
        <div className="emoji">
          {action?.like > 0 && <i id="like" className="fa-solid fa-thumbs-up"></i>}
          {action?.celebrate > 0 && <i id="celebrate" className="fa-solid fa-hands-clapping"></i>}
          {action?.support > 0 && <i id="support" className="fa-solid fa-hand-holding-heart"></i>}
          {action?.love > 0 && <i id="love" className="fa-solid fa-heart"></i>}
          {action?.insightful > 0 && <i id="insightful" className="fa-solid fa-lightbulb"></i>}
          {action?.curious > 0 && (
            <img
              id="curious"
              className="curious"
              src="/images/thinking-emoji.svg"
              alt=""
            />
          )}
        </div>
        <span className="count">{action?.totalActions}</span>
      </InfoReaction>
      <span className="comments">{`${comments} comments`}</span>
      <span className="shares">{`${shares} shares`}</span>
    </Container>
  );
};

export default PostInfo;
