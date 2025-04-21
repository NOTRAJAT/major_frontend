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
  let bgColor = "bg-amber-50";
  if (reading > 300 && reading <= 600) {
    lightColor = "from-yellow-300 to-yellow-500"; // Medium light
    bgColor = "bg-yellow-50";
  } else if (reading > 600) {
    lightColor = "from-yellow-400 to-orange-400"; // Bright light
    bgColor = "bg-orange-50";
  }

  // Generate interval markers
  const intervals = [0, 200, 400, 600, 800, 1000];

  return (
    <div className={`w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center transition-all hover:shadow-2xl duration-500 relative overflow-hidden ${bgColor}`}>
      {/* Light rays effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/20 to-transparent"></div>
      
      {/* Main content */}
      <div className="relative w-full h-full flex flex-col items-center justify-between z-10">
        {/* Arrow visualization */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer ring with intervals */}
          <div className="absolute w-full h-full rounded-full border-4 border-gray-100">
            {intervals.map((value, index) => {
              const angle = -120 + (value / maxValue) * 240;
              return (
                <div key={index} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Interval line */}
                  <div
                    className="h-24 w-[2px] bg-gray-200 origin-bottom absolute bottom-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  ></div>
                  {/* Interval text */}
                  <div
                    className="absolute whitespace-nowrap text-xs text-gray-500 font-medium"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-96px) rotate(${-angle}deg)`,
                    }}
                  >
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Inner ring with gradient */}
          <div className={`absolute w-[90%] h-[90%] rounded-full ${bgColor} transition-colors duration-500`}></div>
          
          {/* Modern arrow design */}
          <div className="relative w-full h-full">
            <div 
              className="absolute left-1/2 bottom-1/2 -translate-x-1/2 origin-bottom transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              {/* Arrow body */}
              <div className={`w-2 h-20 rounded-full bg-gradient-to-t ${lightColor}`}></div>
              
              {/* Arrow head */}
              <div 
                className={`absolute -top-4 -left-2 w-6 h-6 bg-gradient-to-t ${lightColor}`}
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              ></div>
              
              {/* Glow effect */}
              <div 
                className={`absolute -top-4 -left-2 w-6 h-6 blur-sm bg-gradient-to-t ${lightColor} opacity-50`}
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              ></div>
            </div>
          </div>
          
          {/* Center point with shadow effect */}
          <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
            <div className="absolute w-2 h-2 rounded-full bg-gray-300/30 top-1 left-1"></div>
          </div>
        </div>

        {/* Light reading with larger display */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-700">
            {reading.toFixed(1)}
          </div>
          <div className="text-sm font-medium text-gray-400">lux</div>
        </div>

        {/* Status label with modern design */}
        <div className="text-lg font-medium text-gray-600 flex flex-col items-center">
          <span className="block text-center font-semibold">Luminance</span>
          <span className={`px-4 py-1 rounded-full text-sm mt-2 ${
            reading < 300 
              ? 'bg-amber-100 text-amber-700' 
              : reading > 600 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-yellow-100 text-yellow-700'
          }`}>
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