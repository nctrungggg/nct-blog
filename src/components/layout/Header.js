import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { userRole } from "utils/constants";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const userLink = [
  {
    title: "Manage",
    url: "/manage/posts",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Log out",
    url: "/sign-in",

    onClick: () => signOut(auth),
  },
];

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 60px;
  margin: 0 auto;

  z-index: 100;
  height: 120px;
  transition: all 0.3s linear;

  .header {
    height: inherit;
  }

  .header-main {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      margin: 0 auto;

      @media screen and (max-width: 767.98px) {
        width: 35px;
        height: 35px;
      }
    }
  }

  .logo {
    font-weight: 600;
    letter-spacing: 2px;
    color: ${(props) => props.theme.primary};
    font-size: 20px;
  }

  .menu {
    align-items: center;
    gap: 20px;
    list-style: none;
    font-weight: 500;
    color: ${(props) => props.theme.primary};

    &-item {
      padding: 5px 10px;
    }
  }

  .menu-link {
    &.active,
    &:hover {
      color: ${(props) => props.theme.black};
      font-weight: 600;
    }
  }

  /* .search {
    margin-left: auto;
    padding: 10px 20px;
    border: 1px solid #fcfcfc;
    border-radius: 8px;
    width: 100%;
    max-width: 250px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;

    & > input {
      background-color: transparent;
      color: white;

      &::placeholder {
        color: white;
      }
    }
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 400;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;

    cursor: pointer;

    & > svg > * {
      stroke: white !important;
    }
  } */

  @media screen and (max-width: 1023.98px) {
    .logo {
      font-size: 18px;
    }
  }
`;

const Header = () => {
  const { userInfo } = useAuth();

  const headerRef = useRef(null);
  const [menu, setMenu] = useState(false);

  const handleClickMenu = () => {
    setMenu(!menu);
  };

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
    <HeaderStyles ref={headerRef}>
      <div className=" header">
        <div className="header-main">
          <NavLink to="/">
            <h2 className="logo">NCT</h2>
          </NavLink>

          <ul className="hidden menu md:flex">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div> */}

          <div className="flex items-center gap-5">
            <div>
              {!userInfo && (
                <Button
                  type="button"
                  height="48px"
                  className="header-button"
                  to="/sign-in"
                >
                  Login
                </Button>
              )}

              {/* {userInfo && userInfo?.role === userRole.ADMIN && (
                <div className="header-auth">
                  <Button
                    kind="secondary"
                    type="button"
                    height="48px"
                    className="header-button"
                    to="/manage/posts"
                  >
                    Dashboard
                  </Button>
                </div>
              )} */}

              {userInfo && (
                <div className="header-auth">
                  {/* <Button
                kind="secondary"
                type="button"
                height="48px"
                className="header-button"
                to="/profile"
              >
                Profile
              </Button> */}

                  <div className="relative cursor-pointer group">
                    <img src={userInfo.avatar} alt="user-avatar" />

                    <ul className=" w-[100px] mt-3 rounded-md absolute   text-center invisible bg-white  group-hover:opacity-100 group-hover:visible transition-all ">
                      {userInfo?.role === userRole.ADMIN &&
                        userLink.map((link) => {
                          return (
                            <Link
                              key={link.title}
                              to={link.url}
                              onClick={link.onClick}
                              className="p-2 text-sm block hover:text-[#2700ff]  first:border-b "
                            >
                              {link.title}
                            </Link>
                          );
                        })}

                      {userInfo?.role !== userRole.ADMIN &&
                        userLink.slice(1).map((link) => {
                          return (
                            <Link
                              key={link.title}
                              to={link.url}
                              onClick={link.onClick}
                              className="p-2 text-sm block hover:text-[#2700ff]  first:border-b "
                            >
                              {link.title}
                            </Link>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={handleClickMenu}
              className="z-10 cursor-pointer md:hidden"
            >
              {!menu ? (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    color="#000"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    color="#000"
                    style={{ width: "30px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div
              className={
                !menu
                  ? " menu-mobile opacity-0 invisible translate-x-full "
                  : "menu-mobile   translate-x-0 visible opacity-100 "
              }
            >
              <ul className="text-center pt-[120px]  ">
                {menuLinks.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-6 text-lg font-medium transition-all md:text-xl hover:text-purple dark:hover:text-primary"
                  >
                    <NavLink
                      className="menu-link"
                      onClick={handleClickMenu}
                      to={item.url}
                      smooth="true"
                      duration={500}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
