import React from "react";
import Layout from "components/layout/Layout";

function Contact() {
  return (
    <Layout>
      <div className=" lg:pt-40 pb-[130px] pt-[180px] ">
        <div className="container flex gap-8 justify-between flex-col lg:flex-row">
          <div className="lg:w-[555px] lg:h-[365px] rounded-lg w-full] h-[180px]">
            <img
              src="/contact.webp"
              alt="banner"
              style={{ borderRadius: "inherit" }}
              className="h-full w-full"
            />
          </div>
          <div className="flex-1">
            <h1 className=" text-2xl lg:text-4xl font-medium text-center">
              {" "}
              Liên hệ với mình
            </h1>

            <div className="flex justify-center mt-4 lg:t-8 ">
              <ul className="flex items-center  gap-10">
                <li className="transition-all hover:duration-300 translate-y-0 hover:-translate-y-3">
                  <a
                    className="block w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
                    href="https://www.facebook.com/trungg.nguyen.3576/"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <img src="/facebook.svg" alt="fb" className="w-full" />
                  </a>
                </li>

                <li className="transition-all hover:duration-300  translate-y-0 hover:-translate-y-3">
                  <a
                    className="block w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                    href="https://github.com/nctrungggg"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <img src="/github.svg" alt="git" className="w-full" />
                  </a>
                </li>

                <li className="transition-all  hover:duration-300 translate-y-0 hover:-translate-y-3">
                  <a
                    className="block w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                    href="/"
                  >
                    <img src="/Mail.svg.png" alt="email" className="w-full" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
