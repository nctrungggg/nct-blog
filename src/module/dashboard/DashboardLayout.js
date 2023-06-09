import Footer from "components/layout/Footer";
import { useAuth } from "contexts/auth-context";
import PageNotFound from "pages/PageNotFound";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { userRole } from "utils/constants";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding-top: 180px;
  padding-bottom: 150px;

  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }

    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }

    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      gap: 0 40px;
      align-items: start;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 100px;

    .dashboard {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 0 0 20px 20px;
      }
    }
  }
`;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (userInfo?.role !== userRole.ADMIN) return <PageNotFound></PageNotFound>;
  return (
    <>
      <DashboardHeader></DashboardHeader>
      <DashboardStyles>
        <div className="container ">
          <div className="dashboard-main relative">
            <Sidebar></Sidebar>
            <div className="dashboard-children">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </DashboardStyles>
      <Footer />
    </>
  );
};

export default DashboardLayout;
