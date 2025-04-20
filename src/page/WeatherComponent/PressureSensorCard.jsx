
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";

const PressureSensorCard = ({ SetSubscription, topic }) => {
  const maxValue = 1100; // Standard atmospheric pressure range (hPa)
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

  // Normalize pressure reading for visualization (950-1050 hPa typical range)
  const normalizedPressure = Math.max(0, Math.min(100, ((reading - 950) / 100) * 100));

  // Set color based on pressure levels
  let pressureColor = "from-emerald-300 to-emerald-600"; // Normal pressure
  if (reading < 980) {
    pressureColor = "from-indigo-300 to-indigo-600"; // Low pressure
  } else if (reading > 1020) {
    pressureColor = "from-amber-300 to-amber-600"; // High pressure
  }

  return (
    <div className="w-64 h-96 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center transition-all hover:shadow-2xl duration-500 relative overflow-hidden">
      {/* Atmospheric effect background */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-sky-50/30 animate-pulse"></div>
      
      {/* Main content */}
      <div className="relative w-full h-full flex flex-col items-center justify-between z-10">
        {/* Pressure reading */}
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-700">
          {reading.toFixed(1)} hPa
        </div>
        
        {/* Circular pressure gauge */}
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
          
          {/* Pressure indicator */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner flex items-center justify-center">
            <div 
              className={`w-36 h-36 rounded-full bg-gradient-to-br ${pressureColor} transform transition-all duration-1000 ease-in-out flex items-center justify-center`}
              style={{
                transform: `scale(${0.5 + (normalizedPressure / 200)})`,
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
              }}
            >
              {/* Pulse effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${pressureColor} animate-ping opacity-20`}></div>
            </div>
          </div>
          
          {/* Tick marks */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-gray-300"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-24px)`,
                transformOrigin: 'bottom'
              }}
            ></div>
          ))}
        </div>

        {/* Status label */}
        <div className="text-lg font-medium text-gray-600">
          <span className="block text-center">Pressure</span>
          <span className="block text-sm text-gray-400 mt-1">
            {reading < 980 ? 'Low' : reading > 1020 ? 'High' : 'Normal'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PressureSensorCard;

PressureSensorCard.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};