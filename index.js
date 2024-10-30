// Import the mqtt library
import mqtt from "mqtt";

// Define the broker's URL (adjust according to your broker address)
const brokerUrl = 'mqtt://65.0.95.240';  // Replace with your broker's address

// Define the topic to subscribe to or publish
const topic = 'test/topic';

// Define the authentication options (username and password)
const options = {
    username: 'raspberryPI',  // Replace with your MQTT username
    password: 'admin@123'   // Replace with your MQTT password
};

// Create a client and connect to the broker with authentication
const client = mqtt.connect(brokerUrl, options);

// Event: On successful connection
client.on('connect', function () {
    console.log('Connected to MQTT broker with authentication');

    // Subscribe to a topic
    client.subscribe(topic, function (err) {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);

            // Publish a message to the topic
            client.publish(topic, 'Hello from Node.js MQTT client with auth!');
        } else {
            console.log('Subscription error:', err);
        }
    });
});

// Event: On message received
client.on('message', function (topic, message) {
    console.log(`Received message on ${topic}: ${message.toString()}`);
});

// Event: On connection error
client.on('error', function (err) {
    console.log('Connection error:', err);
});

// const decoder = new TextDecoder("utf-8");
// const options = {
//   username: "raspberryPI", // Replace with your MQTT username
//   password: "admin@123", // Replace with your MQTT password
//   connectTimeout: 30 * 1000, // Timeout in milliseconds (5000ms = 5 seconds)
//   reconnectPeriod: 1000,
// };
// //   const [mqttClient, setMqttclient] = useState(null);

// // const message = useMqtt("test/topic", "mqtt://65.0.95.240", options);
// useEffect(() => {
//   const client = mqtt.connect("mqtt://65.0.95.240:8083", options);
//   client.on("connect", () =>
//     console.log(`Connected at ${new Date().toISOString()}`)
//   );
//   client.subscribe("test/topic", (err) => {
//     if (!err) {
//       console.log(`Subscribed to topic: `);
//     } else {
//       console.error(`Failed to subscribe: ${err.message}`);
//     }
//   });
//   client.on("message", (receivedTopic, payload) => {
//     console.log(receivedTopic, decoder.decode(payload));
//   });

//   return () => {
//     client.removeAllListeners();
//     client.end();
//   }; // Clean up on unmount
// }, []);