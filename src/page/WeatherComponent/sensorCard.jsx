import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const SensorCard = ({ SetSubscription, topic }) => {
  const maxValue = 55;
  const [reading, setReading] = useState(0.0);

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

  const fillHeight = Math.min((reading / maxValue) * 100, 100).toFixed(0);

  return (
    <div className="w-64 h-fit bg-white rounded-xl flex flex-col items-center p-4 relative transition-shadow hover:drop-shadow-[0px_0px_20px_rgba(0,0,0,.80)] duration-500 hover:rounded-xl">
      {/* <div className="w-10/12 text-sm font-open font-semibold text-gray-600 mb-3 text-left">
        Temperature Sensor (bmp280)
      </div> */}

      {/* <div className="w-10/12 text-xs font-open text-left line-clamp-2 hover:line-clamp-none transition-all mb-2 hover:text-sm">
        The BMP280 is a high-precision, low-power digital barometric pressure
        and temperature sensor. It can measure atmospheric pressure to determine
        altitude and provide accurate temperature readings. Commonly used in
        weather stations, IoT devices, and GPS navigation systems, it supports
        both I2C and SPI communication protocols. With its small size and low
        power consumption, the BMP280 is ideal for mobile and battery-operated
        applications.
      </div> */}

      <div className="w-full flex justify-center my-4">
        <div className="w-6 h-40 bg-slate-200 rounded-full border relative flex items-end">
          <div
            className="bg-gradient-to-t from-red-500 via-yellow-400 to-blue-500 w-full rounded-b-full transition-all"
            style={{ height: `${fillHeight}%` }}
          ></div>
        </div>
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
};
