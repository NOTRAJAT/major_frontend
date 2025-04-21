import { useEffect, useState } from "react";
import LeftBar from "./WeatherComponent/LeftBar";
import { Decoder, ObjectMap } from "../utils"; // Utility functions for mapping over objects
import SensorCard from "./WeatherComponent/sensorCard";
import { getClient, postDataNoPayload } from "../request"; // Functions to handle MQTT requests
import { useLocation, useNavigate } from "react-router-dom";
import {
  ADD_MQTT_USER,
  UPDATE_MQTT_USER,
  UPDATE_MQTT_USER_INTERVAL,
} from "../env"; // Environment constants
import Button_ from "./component/CentreBox/Button_";
import PressureSensorCard from "./WeatherComponent/PressureSensorCard";
import LightSensorCard from "./WeatherComponent/LightSensorCard";
import HumidityCard from "./WeatherComponent/HumidityCard";
import Co2Card from "./WeatherComponent/Co2Card";
import TemperatureCard1 from "./WeatherComponent/temperatureCard1";

// Function to handle incoming device subscriptions
const DeviceSub = (payload) => {
  console.log(Decoder.decode(payload)); // Decode and log the payload
};

// Convert an array of topics to an object with subscription handlers
const SubListToObj = (array) => {
  const obj = {};
  array.map((v) => {
    obj[v] = null; // Initialize all subscriptions with null
  });
  obj[array[0]] = DeviceSub; // Assign the first topic a handler function
  return obj;
};

const WeatherApp = () => {
  const location = useLocation(); // Hook to access the location object
  const { loginPayload } = location.state || {}; // Extract login payload from location state
  const navigate = useNavigate();

  const [Clienthook, setClient] = useState(null); // Holds the MQTT client instance
  const [userMosquitto, setUserMosquitto] = useState(null); // MQTT username state
  const [passMosquitto, setPassMosquitto] = useState(null); // MQTT password state
  const [authFailed, setAuthFalied] = useState(false);
  const subscribeList = loginPayload.topic; // List of MQTT topics to subscribe to

  // State for storing the subscription functionality object
  const [subscriptionFuncObject, SetSubscription] = useState(
    SubListToObj(subscribeList)
  );

  // Log the current subscription function object to the console
  console.log(subscriptionFuncObject);

  // Function to handle incoming messages based on received topic
  const MessageFuntionalityAdder = (receivedTopic, payload) => {
    ObjectMap(subscriptionFuncObject, (v, k) => {
      if (k === receivedTopic && v != null) {
        v(payload); // Call the handler if the topic matches and a handler exists
      }
    });
  };

  const Wrapper_Set_Auth = () => {
    setAuthFalied(true);
  };
  // Effect to manage the MQTT client connection and subscriptions
  useEffect(() => {
    if (userMosquitto != null) {
      const client = getClient(userMosquitto, passMosquitto); // Connect to the MQTT broker
      setClient(client); // Store the client instance in state

      client.on("connect", () =>
        console.log(`Connected at ${new Date().toISOString()}`)
      );

      // Subscribe to the topics in the list
      subscribeList.map((topic) => {
        client.subscribe(topic, (err) => {
          if (!err) {
            console.log(`Connected to ${topic}`); // Log success for each topic
          } else {
            console.log(err); // Log any errors
          }
        });
      });

      // Set an interval to periodically update the MQTT user
      const intervalId = setInterval(() => {
        postDataNoPayload(UPDATE_MQTT_USER, loginPayload.token, () => {
          setAuthFalied(true);
          clearInterval(intervalId);
        });
      }, UPDATE_MQTT_USER_INTERVAL);

      // Clean up the MQTT client when the component unmounts
      return () => {
        client.removeAllListeners(); // Remove all event listeners
        client.end(); // Close the MQTT connection
        setClient(null);
        clearInterval(intervalId); // Clear the interval
      };
    }
  }, [userMosquitto]);

  // Effect to add a new MQTT user upon component mount
  useEffect(() => {
    postDataNoPayload(ADD_MQTT_USER, loginPayload.token, Wrapper_Set_Auth).then(
      (res) => {
        setPassMosquitto(res.data.password); // Keep password for MQTT connection
        setUserMosquitto(res.data.username); // Keep username for MQTT connection
      }
    );
  }, []);

  // Effect to listen for messages from the MQTT client
  useEffect(() => {
    if (Clienthook != null) {
      const out = Clienthook.on("message", MessageFuntionalityAdder); // Listen for messages
      return () => {
        out.removeAllListeners(); // Clean up listener on unmount or when the client changes
      };
    }
  }, [subscriptionFuncObject, Clienthook]); // Add effect when the message handler changes

  return (
    <>
      {/* Main container with background styling */}
      <div className="relative">
        <div className="bg-[#E3E8EC] h-svh flex justify-center items-start bg-gradient-to-r from-gray-100 via-gray-100 to-gray-400 relative ">
          <LeftBar SetSubscription={SetSubscription} />
          {/* Left bar component */}
          <div className="w-11/12  items-center gap-x-3 relative">
          <div className=" absolute top-2 left-0">
          <SensorCard topic="temperature" SetSubscription={SetSubscription} />{" "}
          </div>
 
            <PressureSensorCard topic="pressure" SetSubscription={SetSubscription}/>
            <LightSensorCard topic="ldr" SetSubscription={SetSubscription}/> 
            <HumidityCard topic="humidity" SetSubscription={SetSubscription}/>
            <Co2Card topic="gas" SetSubscription={SetSubscription}/>
            <TemperatureCard1 topic="temperature1" SetSubscription={SetSubscription}/>
            {/* Sensor card for temperature */}
          </div>
          
        </div>
        {authFailed && (
          <div className="w-[100vw]  h-[100vh] bg-black bg-opacity-50 backdrop-blur-2xl absolute top-0 left-0 z-10 text-white p-4  flex justify-center items-center">
            <div className="w-80 h-[32%]  flex  flex-col gap-y-6   rounded-md bg-white   px-4 pt-12 font-open text-[#928E8E] font-medium text-sm items-center ">
              <div className="text-2xl font-open text-red-800">
                Session Expired
              </div>
              <div className="w-fit p-1 hover:drop-shadow-2xl  rounded-md bg-[#3C40C6] hover:bg-[#545aff] text-base  font-semibold">
                <Button_
                  Name="<-Home Page"
                  TextColor="#ffffff"
                  FunctionName={[
                    () => {
                      navigate("/");
                    },
                  ]}
                  // Params={[!IsBlurWindowVisible]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
