import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const LightSensorCard = ({ SetSubscription, topic }) => {
  const maxValue = 1000;
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

  // Calculate rotation angle (0 to 180 degrees)
  const rotationAngle = Math.min(180, (reading / maxValue) * 180);

  // Set color based on light levels
  let meterColor = "bg-amber-400"; // Low light
  if (reading > 300 && reading <= 600) {
    meterColor = "bg-yellow-400"; // Medium light
  } else if (reading > 600) {
    meterColor = "bg-orange-400"; // Bright light
  }

  return (
    <div className="w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-between">
      {/* Light reading display */}
      

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
        {/* <div className="absolute w-full h-full flex justify-between px-2">
          {[500, 250, 0, 250, 500].map((value) => (
            <div key={value} className="relative h-full w-0">
              <div className="absolute top-0 w-[2px] h-2 bg-gray-400"></div>
              <div className="absolute -top-6 -translate-x-1/2 text-sm text-gray-600">
                {value}
              </div>
            </div>
          ))}
        </div> */}

      </div>
      
      <div className="text-xl font-bold text-gray-800 flex items-baseline gap-2">
        {reading.toFixed(1)}
        <span className="text-base text-gray-500">lux</span>
      </div>

      {/* Status indicator */}
      <div className="mt-8 text-center">
        <div className="text-lg font-semibold text-gray-700">Light Level</div>
        <div className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
          reading < 300 
            ? 'bg-amber-100 text-amber-700' 
            : reading > 600 
              ? 'bg-orange-100 text-orange-700' 
              : 'bg-yellow-100 text-yellow-700'
        }`}>
          {reading < 300 ? 'Low' : reading > 600 ? 'Bright' : 'Medium'}
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