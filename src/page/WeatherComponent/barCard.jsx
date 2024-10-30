// import React from "react";
// import mqtt from "mqtt";
// import { stringify } from "postcss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Decoder } from "../../utils";
// import { useEffect } from "react";
// import { useMqtt } from "./useMqtt";
// import { useState } from "react";
// import { optionsMQTT } from "../../request";

const BarCard = ({
  isHover,
  imgURL,
  name,
  deviceID,
  SetSubscription,
  topic,
}) => {
  const [deviceStatus, setDeviceStatus] = useState("disconnected");

  useEffect(() => {
    SetSubscription((prev) => {
      return {
        ...prev,
        [topic]: (payload) => setDeviceStatus(Decoder.decode(payload)),
      };
    });
  }, []);

  return (
    <div
      className={`w-11/12 mb-6 p-1 bg-transparent   drop-shadow-[15px_15px_20px_rgba(0,0,0,.20)] transition-all flex flex-col items-center pt-2 ease-in gap-y-1 ${
        isHover
          ? "scale-100 delay-100 duration-200"
          : "scale-0 delay-0 duration-150"
      }`}
    >
      <img src={imgURL} alt="" className="w-10/12 object-contain rounded-lg" />
      <div className="w-10/12 ps-1 ">
        <div className=" flex gap-x-1 ps-2 text-xs">
          Name:
          <span className=" font-open ">{name}</span>
        </div>

        <div className="flex gap-x-1 ps-2 text-xs ">
          Status:
          <span
            className={`font-open  ${
              deviceStatus == "connected" ? "text-green-500" : "text-red-500"
            }`}
          >
            {deviceStatus}
          </span>
        </div>
        <div className="flex gap-x-1 ps-2 text-xs">
          Device-Id:
          <span className=" font-open ">{deviceID}</span>
        </div>
      </div>
    </div>
  );
};

export default BarCard;
BarCard.propTypes = {
  isHover: PropTypes.bool.isRequired,
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  deviceID: PropTypes.string.isRequired,

  SetSubscription: PropTypes.func.isRequired,
  //   Clientmqtt: PropTypes.object.isRequired,
};
