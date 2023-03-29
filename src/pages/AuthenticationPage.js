import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding-top: 70px;
  padding-bottom: 100px;

  .logo {
    margin: 0 auto 20px;
  }

  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }

  .have-account {
    margin-bottom: 20px;
    font-size: 14px;

    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }

  @media screen and (max-width: 767.98px) {
    .heading {
      font-size: 26px;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <div className="flex justify-between ">
          <div className="w-[500px]">
            <div className="text-center"></div>
            <Link to="/">
              <h2 className="heading">NCT Blogging</h2>
            </Link>
            {children}
          </div>
          <div className="h-[550px] w-[500px] hidden md:block">
            <img
              src="login.webp"
              alt="sign-in"
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
