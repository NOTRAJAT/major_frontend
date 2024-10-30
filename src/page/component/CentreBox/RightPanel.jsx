// function RightPanel() {
//   return (

//            <div className=' w-[60%] h-fit  ' >
//               <img src=".\images\rpi-image.png" alt="" className="w-9/12 mx-auto  drop-shadow-2xl" />

//               <div className="text-center text-2xl "> (Raspberry Pi 5)</div>
//          <p className="px-4 text-xs font-open text-[#545252] ">
//          The Raspberry Pi 5 features a 2.4GHz quad-core ARM Cortex-A76 CPU, offering significantly improved performance over previous models. It also supports up to 8GB of RAM, dual 4K HDMI output, and PCIe for enhanced connectivity.
//          </p>
//          </div>

//   )
// }

// export default RightPanel
import { useState, useEffect } from "react";

const slides = [
  {
    src: "/images/rpi-image.png",
    title: "(Raspberry Pi 5)",
    description:
      "The Raspberry Pi 5 is a powerful platform for IoT applications, featuring an upgraded ARM Cortex-A76 processor that enhances data processing capabilities. With dual 4K display outputs via micro-HDMI and high-speed USB 3.0 ports, it can handle multiple peripherals efficiently. Its versatility and compatibility with various operating systems make it an ideal choice for developing and deploying IoT solutions.",
  },
  {
    src: "/images/node_mcu.PNG", // Add more image paths here
    title: "(NodeMcu)",
    description:
      "NodeMCU is a low-cost open source IoT platform. It initially included firmware which runs on the ESP8266 Wi-Fi SoC from Espressif Systems, and hardware which was based on the ESP-12 module. Later, support for the ESP32 32-bit MCU was added.",
  },
  // {
  //   src: '/images/dh11.PNG', // Add more image paths here
  //   title: '(dh11 Temperature & Humidity Sensor)',
  //   description: 'The DHT11 sensor is a low-cost, digital temperature and humidity sensor that provides accurate readings with a simple interface. It operates with a single-wire communication protocol, making it ideal for basic weather monitoring projects.',
  // },
  {
    src: "/images/Iot-arch.PNG", // Add more image paths here/images/CommunicationArch.PNG
    title: "(MQTT IoT Architecture with Edge Gateway)",
    description:
      "MQTT-based communication architecture for IoT devices. The AWS server hosts an MQTT broker that communicates with an Edge Gateway, which also runs its own MQTT broker. The Edge Gateway then relays messages to multiple Edge Node Devices. This setup allows decentralized message handling, with the Edge Gateway serving as an intermediary between cloud services (AWS) and local IoT devices.",
  },
  {
    src: "/images/CommunicationArch.PNG", // Add more image paths here
    title: "(Communication Flow Architecture)",
    description:
      "An IoT architecture using a Raspberry Pi as an Edge Gateway. The Raspberry Pi connects to a router via Ethernet (eth0) and forwards data wirelessly through its Wi-Fi interface (wlan0) to a NodeMCU device acting as an Edge Node. Sensors are physically connected to the NodeMCU, which communicates wirelessly with the Raspberry Pi. Data is then routed to AWS (the Fog Node) over the internet for processing and storage.",
  },
];

function RightPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [isDotClicked, setDot] = useState(false);
  let interval; // Variable to hold the interval ID
  let clickTimeoutid;
  // Function to start the sliding interval
  const startSliding = () => {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);
  };

  // Automatically slide to the next image after 5 seconds
  useEffect(() => {
    startSliding();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  });

  const RemoveTimeOut = () => {
    for (let i = 0; i <= clickTimeoutid; i++) {
      clearTimeout(i);
    }
  };
  const TimedOutStart = () => {
    // console.log("Timeout finished");
    if (!isDotClicked) {
      clickTimeoutid = setTimeout(() => {
        setIsHovered(false);
        // console.log("Timeout finished");
      }, 2000); // 300ms delay
    }
  };
  // Effect to handle hover state
  useEffect(() => {
    for (let i = 0; i <= interval; i++) {
      clearInterval(i);
    }
    if (!isHovered & !isDotClicked) {
      startSliding(); // Restart sliding when not hovered
    }
  }, [isHovered]);

  const Trifacta = (index) => {
    {
      setDot(true);
      setCurrentIndex(index);
      setIsHovered(false);
    }
  };

  return (
    <div
      className="w-[60%] h-fit relative  py-4 md-range:hidden"
      onMouseEnter={() => {
        setIsHovered(true), RemoveTimeOut();
      }} // Set hovered state to true on mouse enter
      onMouseLeave={TimedOutStart} // Set hovered state to false on mouse leave
      // onClick={()=>setIsHovered(true)}
    >
      {/* Image */}
      <div className="w-full  flex justify-center items-center p-1">
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].title}
          className="h-[200px] w-auto object-contain rounded-2xl mx-auto py-1 "
        />
      </div>
      {/* Image Title */}
      <div className="text-center text-2xl my-2">
        {slides[currentIndex].title}
      </div>

      {/* Image Description */}
      <p
        className="px-8 text-sm font-open text-[#6c6c6c] text-left line-clamp-2 hover:line-clamp-none transition-all duration-300 ease-in-out
  hover:bg-white hover:rounded-xl hover:drop-shadow-2xl hover:text-[#6c6c6c] hover:p-3
"
      >
        {slides[currentIndex].description}
      </p>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${
              index === currentIndex ? "bg-gray-700" : "bg-gray-300"
            } cursor-pointer`}
            onClick={() => {
              Trifacta(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default RightPanel;
