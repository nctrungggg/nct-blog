import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 150px 0;
  /* background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  ); */
  /* background-image: url("world.jpeg");
  background-repeat: no-repeat;
  background-size: 100%; */

  margin-bottom: 60px;

  .banner {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    padding-top: 50px;

    &-content {
      max-width: 500px;
      color: white;

      @media screen and (max-width: 767.98px) {
        width: 100%;
      }
    }

    &-heading {
      font-size: 44px;
      margin-bottom: 20px;
      font-weight: bold;
      color: ${(props) => props.theme.primary};
    }

    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
    }

    &-image {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(12, 66, 119, 0.4);
      width: 555px;

      img {
        border-radius: inherit;
        width: 100%;
        object-fit: cover;
        display: block;

        @media screen and (max-width: 767.98px) {
          height: 180px;
        }
      }
    }
  }

  @media screen and (max-width: 1023.98px) {
    padding: 70px 0;

    .banner {
      margin-top: 50px;

      flex-direction: column;
      min-height: unset;

      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }

      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }

      &-image {
        margin-top: 25px;
      }

      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }

    @media screen and (max-width: 767.98px) {
      padding-top: 70px;
      padding-bottom: 30px;

      .banner {
        margin-top: 30px;

        &-heading {
          font-size: 26px;
        }

        &-desc {
          margin-bottom: 0;
        }

        &-image {
          margin-top: 0;
          width: 100%;
        }

        &-button {
          display: none;
        }
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Welcome đến với Blog của mình</h1>
            <p className="banner-desc">
              Chào mừng bạn đến với blog của mình, nơi chia sẻ tất cả mọi thứ có
              trên đời này kk =)))
            </p>
            <Button to="/sign-in" className="banner-button" height="55px">
              Bắt đầu nào !
            </Button>
          </div>
          <div className="banner-image">
            <img src="/pexels-photo-1591056.jpeg" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
