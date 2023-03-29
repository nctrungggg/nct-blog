Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="h-[60px]  flex justify-center flex-col items-center bg-white">
      <p className="text-xs md:text-sm  text-center ">
        Copyright © 2023 by{" "}
        <span className=" tracking-[2px] text-14 md:text-base font-semibold">
          NCT
        </span>
        . All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
