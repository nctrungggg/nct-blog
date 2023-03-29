import { Link } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  color: ${(props) => props.theme.gray4b};

  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }

  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({ date = "Mar 23", className = "", color = "" }) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="post-time" style={{ color: color }}>
        {date}
      </span>
    </PostMetaStyles>
  );
};

export default PostMeta;
