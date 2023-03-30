import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { userRole } from "utils/constants";

const DashboardHeaderStyles = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  height: 120px;
  transition: all 0.3s linear;

  .header-dashboard {
    height: inherit;
  }

  .icon-new-post {
    display: none;
  }

  .header-main {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    color: ${(props) => props.theme.primary};
    font-size: 20px;
  }

  .header-avatar {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  @media screen and (max-width: 767.98px) {
    .logo {
      font-size: 16px;
    }

    .icon-new-post {
      display: block;
    }

    .header-avatar {
      width: 35px;
      height: 35px;
    }

    .header-btt {
      display: none;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current?.classList.add("header-shirnk");
      } else {
        headerRef.current?.classList.remove("header-shirnk");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <DashboardHeaderStyles ref={headerRef}>
      <div className="container header-dashboard">
        <div className="header-main">
          <NavLink to="/">
            <h2 className="logo">NCT</h2>
          </NavLink>

          <div className="header-right">
            {userInfo && userInfo?.role === userRole.ADMIN && (
              <>
                <div className="header-btt">
                  <Button
                    to="/manage/add-post"
                    className="header-button"
                    height="50px"
                  >
                    Write new post
                  </Button>
                </div>
                <Link to="/manage/add-post" className="icon-new-post">
                  <div className="text-[#343a40]">
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            )}
            <Link to="/profile" className="header-avatar">
              <img src={userInfo?.avatar} alt="avt-user" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
