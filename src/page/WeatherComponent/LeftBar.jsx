import { useState } from "react";
import BarCard from "./barCard";
import { PropTypes } from "prop-types";
// import { useEffect } from "react";
// import { Client } from "mqtt";

const LeftBar = ({ SetSubscription }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="absolute right-0 top-0 w-9 m-2 h-9 rounded-lg  hover:h-fit drop-shadow-[60px_60px_80px_rgba(0,0,0,.50)]  bg-white transition-all ease-out duration-500 hover:w-64 py-2 px-1 hover:border-[0.2px] flex flex-col justify-start items-center z-10"
      onMouseEnter={() => {
        setTimeout(() => setIsHover(true));
      }}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <div className="invisible focus-within:visible bg-black">asssdsdas</div> */}
      <img
        src=".\svg\menuBar.svg"
        alt=""
        width="20px"
        className={`transition-all  duration-500  ease-in ${
          !isHover ? "opacity-70" : "opacity-0"
        }`}
      />
      {
        <BarCard
          isHover={isHover}
          name="Node MCU"
          imgURL="./images/node_mcu.PNG"
          deviceID="RPI5GVDRT"
          SetSubscription={SetSubscription}
          topic="Nodemcu"
        />
      }{" "}
      {
        <BarCard
          isHover={isHover}
          name="Raspberry Pi 5"
          imgURL="./images/rpi-image.png"
          deviceID="RPI5GVDRT"
          SetSubscription={SetSubscription}
          topic="RaspberryPI"
        />
      }
    </div>
  );
};

export default LeftBar;
LeftBar.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
};
