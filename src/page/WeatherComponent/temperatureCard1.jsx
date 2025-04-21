import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const temperatureCard1 = ({ SetSubscription, topic }) => {
  const maxValue = 55;
  const [reading, setReading] = useState(0.0);

  useEffect(() => {
    SetSubscription((prev) => {
      return {
        ...prev,
        [topic]: (payload) => {
          let body = Decoder.decode(payload)
          setReading(parseFloat(body));
          console.log(body);
        },
      };
    });
  }, []);

  const percentage = Math.min((reading / maxValue) * 100, 100);

  // Set color based on temperature
  let barColor = "bg-gradient-to-r from-blue-500 to-blue-300"; // Cool
  if (reading > 20 && reading <= 35) {
    barColor = "bg-gradient-to-r from-yellow-400 to-yellow-200"; // Warm
  } else if (reading > 35) {
    barColor = "bg-gradient-to-r from-red-500 to-red-300"; // Hot
  }

  return (
    <div className="w-64 h-fit bg-white rounded-2xl p-4 shadow-lg flex flex-col items-center transition-shadow hover:shadow-2xl duration-500">
      <div className="w-full flex flex-col items-center">
        {/* Temperature Bar Container */}
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-4">
          {/* Temperature Bar Fill */}
          <div
            className={`h-full ${barColor} transition-all duration-300 ease-in-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-700">
          {reading.toFixed(1)}°C
        </div>
        <div className="text-sm text-gray-400">Temperature-Dht22</div>
      </div>
    </div>
  );
};

export default temperatureCard1;

temperatureCard1.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};
