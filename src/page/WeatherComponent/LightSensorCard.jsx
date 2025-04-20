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
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/20 to-transparent">
        <div className="absolute inset-0 animate-pulse opacity-30 bg-gradient-radial from-yellow-200/50 to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="relative w-full h-full flex flex-col items-center justify-between z-10">
        {/* Light visualization */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-full h-full rounded-full border-4 border-gray-100 animate-spin-slow"></div>
          
          {/* Light beams */}
          <div className="absolute w-full h-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-24 bg-gradient-to-b ${lightColor} opacity-${Math.min(80, normalizedLight)}}`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-50%)`,
                  transformOrigin: '50% 0',
                  filter: `blur(${Math.min(8, normalizedLight / 10)}px)`,
                  animation: 'pulse 2s infinite',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Central orb */}
          <div 
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${lightColor} transition-all duration-1000 ease-in-out flex items-center justify-center relative`}
            style={{
              boxShadow: `0 0 ${normalizedLight}px ${normalizedLight / 2}px rgba(250, 204, 21, 0.4)`
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
          </div>
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