import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";
const SensorCard = ({ SetSubscription, topic }) => {
  const maxValue = 55;

  const [reading, setReading] = useState(0.0);
  //   const [counter, setCounter] = useState(99);
  useEffect(() => {
    SetSubscription((prev) => {
      return {
        ...prev,
        [topic]: (payload) => {
          setReading(parseFloat(Decoder.decode(payload)));
          console.log(Decoder.decode(payload));
        },
      };
    });
  }, []);
  return (
    <div className="w-64 h-fit bg-white rounded-xl flex flex-col items-center p-2 relative pt-2 transition-all   hover:drop-shadow-[0px_0px_20px_rgba(0,0,0,.80)] duration-500 ">
      <img
        src="./images/bmp280.png"
        alt=""
        className="object-contain w-10/12"
      />
      <div className="w-10/12  text-sm  font-open font-semibold text-gray-600 mb-3 text-left">
        Temperature Sensor (bmp280)
      </div>
      <div className="w-10/12 text-xs font-open text-left line-clamp-2 hover:line-clamp-none transition-all mb-2 hover:text-sm">
        The BMP280 is a high-precision, low-power digital barometric pressure
        and temperature sensor. It can measure atmospheric pressure to determine
        altitude and provide accurate temperature readings. Commonly used in
        weather stations, IoT devices, and GPS navigation systems, it supports
        both I2C and SPI communication protocols. With its small size and low
        power consumption, the BMP280 is ideal for mobile and battery-operated
        applications.
      </div>
      <div className="w-10/12 bg-slate-50 border-[0.2px] border-gray-500 rounded-lg h-9 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 flex justify-end items-center">
        <div
          className={` h-full bg-white rounded-e-lg`}
          style={{ width: `${(99 - (reading / maxValue) * 100).toFixed(0)}%` }} // Dynamically setting width
        ></div>
      </div>

      <div className="text-gray-400 text-lg font-open text-left w-10/12">
        Temperature : {reading}°C
      </div>
    </div>
  );
};

export default SensorCard;
SensorCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
  //   Clientmqtt: PropTypes.object.isRequired,
};
