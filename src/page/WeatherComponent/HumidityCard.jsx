import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const HumidityCard = ({ SetSubscription, topic }) => {
  const maxValue = 100;
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

  // Calculate rotation angle (0 to 180 degrees)
  const rotationAngle = Math.min(180, (reading / maxValue) * 180);

  // Set color based on humidity levels
  let meterColor = "bg-blue-400"; // Low humidity
  if (reading > 30 && reading <= 60) {
    meterColor = "bg-green-400"; // Optimal humidity
  } else if (reading > 60) {
    meterColor = "bg-red-400"; // High humidity
  }

  return (
    <div className="w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-between">
      {/* Humidity reading display */}
      <div className="text-4xl font-bold text-gray-800 flex items-baseline gap-2">
        {reading.toFixed(1)}
        <span className="text-base text-gray-500">%</span>
      </div>

      {/* Semi-circular meter */}
      <div className="relative w-48 h-24 mt-4">
        {/* Meter background */}
        <div className="absolute w-full h-full bg-gray-100 rounded-t-full"></div>
        
        {/* Active meter fill */}
        <div 
          className={`absolute bottom-0 left-0 w-full origin-bottom ${meterColor} transition-all duration-500`} 
          style={{ 
            height: '100%',
            borderRadius: '9999px 9999px 0 0',
            transform: `scaleX(${reading / maxValue})`
          }}
        ></div>

        {/* Measurement marks */}
        <div className="absolute w-full h-full flex justify-between px-2">
          {[0, 25, 50, 75, 100].map((value) => (
            <div key={value} className="relative h-full w-0">
              <div className="absolute top-0 w-[2px] h-2 bg-gray-400"></div>
              <div className="absolute -top-6 -translate-x-1/2 text-sm text-gray-600">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Arrow indicator */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-500"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <div className="w-1 h-20 bg-gray-800"></div>
          <div className="w-3 h-3 bg-gray-800 rounded-full -translate-x-1"></div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-8 text-center">
        <div className="text-lg font-semibold text-gray-700">Humidity Level</div>
        <div className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
          reading <= 30 
            ? 'bg-blue-100 text-blue-700' 
            : reading > 60 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
        }`}>
          {reading <= 30 ? 'Low' : reading > 60 ? 'High' : 'Optimal'}
        </div>
      </div>
    </div>
  );
};

export default HumidityCard;

SensorCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};