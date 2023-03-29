import { useEffect, useState } from "react";
import styled from "styled-components";

const ScollBttStyles = styled.div`
  z-index: 10;

  position: fixed;
  bottom: -60px;
  right: 30px;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 2.5px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  overflow: hidden;

  cursor: pointer;

  transition: all 0.38s ease-out;

  &__icon {
    position: relative;

    width: 100%;
    height: 100%;

    transition: all 0.25s ease-out;
  }

  &__icon:hover {
    background-color: rgb(10, 70, 160);
  }

  &.show {
    bottom: 35px;

    opacity: 1;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;

    font-size: 28px;
    transform: translate(-50%, -50%);
  }

  &:hover svg {
    fill: rgb(255, 255, 255);
  }

  @media screen and (max-width: 767.98px) {
    svg {
      font-size: 24px;
    }
  }
`;

function ScollButton() {
  const [isShow, setIsShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickUpToTop = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ScollBttStyles
      className={isShow ? "show" : ""}
      onClick={handleClickUpToTop}
    >
      <div className="scroll-btn__icon ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
    </ScollBttStyles>
  );
}

export default ScollButton;
