import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Decoder } from "../../utils";


const Co2Card = ({ SetSubscription, topic }) => {
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
    
    const getStatusColor = (value) => {
        if (value < 800) return 'bg-emerald-500';
        if (value < 1200) return 'bg-amber-500';
        return 'bg-red-500';
      };
    
      const getTextColor = (value) => {
        if (value < 800) return 'text-emerald-600';
        if (value < 1200) return 'text-amber-600';
        return 'text-red-600';
      };
    
      const getMessage = (value) => {
        if (value < 800) return 'Excellent Air Quality';
        if (value < 1200) return 'Moderate - Consider Ventilation';
        return 'Poor - Ventilation Required';
      };
    
      return (
        <div className="min-h-fit   w-24 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">CO2 Monitor</h2>
                <p className="text-gray-500 text-sm mt-1">{topic}</p>
              </div>
              <div className={`${getTextColor(reading)} flex items-center justify-center w-12 h-12 rounded-full bg-opacity-10`}>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="w-6 h-6"
                >
                  <path d="M12 8v8m-4-4h8" strokeLinecap="round" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
    
            <div className="space-y-6">
              <div className="flex items-end gap-3">
                <span className={`text-5xl font-bold ${getTextColor(reading)}`}>
                  {reading.toFixed(1)}
                </span>
                <span className="text-gray-600 text-xl mb-1">PPM</span>
              </div>
    
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>1000</span>
                  <span>2000+</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ease-in-out ${getStatusColor(reading)}`}
                    style={{ 
                      width: `${Math.min((reading / 2000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
    
              <div className={`${getTextColor(reading)} text-center py-3 px-4 rounded-lg bg-opacity-10 font-medium`}>
                {getMessage(reading)}
              </div>
    
              {/* <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="font-semibold text-gray-800">800</div>
                  <div className="text-gray-500">Good</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="font-semibold text-gray-800">1200</div>
                  <div className="text-gray-500">Warning</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="font-semibold text-gray-800">2000+</div>
                  <div className="text-gray-500">Danger</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      );
     
     
  
}
export default Co2Card;
Co2Card.propTypes = {
  SetSubscription: PropTypes.func.isRequired,
  topic: PropTypes.string.isRequired,
};