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

  const percentage = Math.min((reading / maxValue) * 100, 100);
  const rotation = (percentage * 180) / 100 - 90; // -90 to 90 deg

  // Set color based on temperature
  let gaugeColor = "from-blue-500 to-blue-300"; // Cool
  if (reading > 20 && reading <= 35) {
    gaugeColor = "from-yellow-400 to-yellow-200"; // Warm
  } else if (reading > 35) {
    gaugeColor = "from-red-500 to-red-300"; // Hot
  }

  return (
    <div className="w-64 h-fit bg-white rounded-2xl p-4 shadow-lg flex flex-col items-center transition-shadow hover:shadow-2xl duration-500">
      <div className="w-full flex flex-col items-center">
        {/* Gauge Wrapper */}
        <div className="relative w-40 h-20 mb-4">
          {/* Background Arc */}
          <div className="absolute w-full h-full rounded-t-full bg-gradient-to-r from-slate-300 to-slate-100"></div>

          {/* Filled Arc */}
          <div
            className={`absolute w-full h-full rounded-t-full bg-gradient-to-r ${gaugeColor}`}
            style={{
              clipPath: `polygon(50% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%)`,
              maskImage: `conic-gradient(from -90deg at 50% 100%, #000 ${percentage}%, transparent ${percentage}%)`,
              WebkitMaskImage: `conic-gradient(from -90deg at 50% 100%, #000 ${percentage}%, transparent ${percentage}%)`,
            }}
          ></div>

          {/* Needle */}
          <div
            className="absolute left-1/2 bottom-0 w-1 h-16 bg-black origin-bottom"
            style={{
              transform: `rotate(${rotation}deg) translateX(-50%)`,
            }}
          ></div>

          {/* Center Circle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-10"></div>
        </div>

        <div className="text-lg font-semibold text-gray-600">
          {reading.toFixed(1)}°C
        </div>
        <div className="text-sm text-gray-400">Temperature</div>
      </div>
    </div>
  );
};

export default SensorCard;

SensorCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};
