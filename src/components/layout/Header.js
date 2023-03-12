import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
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

const HeaderStyles = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;
  height: 120px;
  /* box-shadow: 0 8px 24px rgb(0 34 68 / 10%); */
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
  }

  .logo {
    display: block;
    max-width: 50px;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
    color: white;
  }

  .search {
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
  }

  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
`;

const Header = () => {
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
    <HeaderStyles ref={headerRef}>
      <div className="container header">
        <div className="header-main">
          <NavLink to="/">
            <img
              width="40px"
              srcSet="/logo.png 2x"
              alt="monkey-blogging"
              className="logo"
            />
          </NavLink>
          <ul className="menu">
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
          {!userInfo && (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          )}

          {userInfo && userInfo?.role === userRole.ADMIN && (
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
          )}

          {userInfo && userInfo?.role !== userRole.ADMIN && (
            <div className="header-auth">
              <Button
                kind="secondary"
                type="button"
                height="48px"
                className="header-button"
                to="/profile"
              >
                Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
