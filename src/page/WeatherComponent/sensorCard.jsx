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

  // Normalize humidity reading for visualization
  const normalizedHumidity = Math.max(0, Math.min(100, reading));

  // Set color based on humidity levels
  let humidityColor = "from-blue-300 to-blue-600"; // Low humidity
  if (reading > 30 && reading <= 60) {
    humidityColor = "from-green-300 to-green-600"; // Optimal humidity
  } else if (reading > 60) {
    humidityColor = "from-red-300 to-red-600"; // High humidity
  }

  return (
    <div className="w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center transition-all hover:shadow-2xl duration-500 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-50/30 animate-pulse"></div>
      
      {/* Main content */}
      <div className="relative w-full h-full flex flex-col items-center justify-between z-10">
        {/* Circular humidity gauge */}
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
          
          {/* Humidity indicator */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner flex items-center justify-center">
            <div 
              className={`w-36 h-36 rounded-full bg-gradient-to-br ${humidityColor} transform transition-all duration-1000 ease-in-out flex items-center justify-center`}
              style={{
                transform: `scale(${0.5 + (normalizedHumidity / 200)})`,
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
              }}
            >
              {/* Pulse effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${humidityColor} animate-ping opacity-20`}></div>
            </div>
          </div>
        </div>

        {/* Humidity reading */}
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
          {reading.toFixed(1)}%
        </div>

        {/* Status indicator */}
        <div className="mt-8 text-center">
          <div className="text-lg font-semibold text-gray-700">Humidity</div>
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
    </div>
  );
};

export default HumidityCard;

HumidityCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};