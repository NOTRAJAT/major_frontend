import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const LightSensorCard = ({ SetSubscription, topic }) => {
  const maxValue = 1000; // Standard lux range for indoor/outdoor
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

  // Normalize light reading for visualization
  const normalizedLight = Math.max(0, Math.min(100, (reading / maxValue) * 100));
  
  // Calculate rotation angle (from -120 to 120 degrees)
  const rotationAngle = -120 + (normalizedLight / 100) * 240;

  // Set color based on light levels
  let lightColor = "from-amber-200 to-amber-400"; // Low light
  if (reading > 300 && reading <= 600) {
    lightColor = "from-yellow-300 to-yellow-500"; // Medium light
  } else if (reading > 600) {
    lightColor = "from-yellow-400 to-orange-400"; // Bright light
  }

  return (
    <div className="w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center transition-all hover:shadow-2xl duration-500 relative overflow-hidden">
      {/* Light rays effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/20 to-transparent"></div>
      
      {/* Main content */}
      <div className="relative w-full h-full flex flex-col items-center justify-between z-10">
        {/* Arrow visualization */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Circular background */}
          <div className="absolute w-full h-full rounded-full border-8 border-gray-100"></div>
          
          {/* Tick marks */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-gray-300"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${-120 + i * 40}deg) translateY(-20px)`,
                transformOrigin: 'bottom'
              }}
            ></div>
          ))}
          
          {/* Arrow */}
          <div 
            className={`w-4 h-32 bg-gradient-to-t ${lightColor} rounded-t-full`}
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 1s ease-out'
            }}
          >
            {/* Arrow head */}
            <div 
              className={`w-8 h-8 bg-gradient-to-t ${lightColor} -translate-x-2`}
              style={{
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
              }}
            ></div>
          </div>
          
          {/* Center point */}
          <div className="absolute w-6 h-6 rounded-full bg-gray-800 shadow-lg"></div>
        </div>

        {/* Light reading */}
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-700">
          {reading.toFixed(1)} lux
        </div>

        {/* Status label */}
        <div className="text-lg font-medium text-gray-600">
          <span className="block text-center">Luminance</span>
          <span className="block text-sm text-gray-400 mt-1">
            {reading < 300 ? 'Low' : reading > 600 ? 'Bright' : 'Medium'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LightSensorCard;

LightSensorCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};