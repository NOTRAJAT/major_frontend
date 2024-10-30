// import mqtt from 'mqtt';
import axios from "axios";
import mqtt from 'mqtt'
import { BACKEND_URL, MQTT_SERVER } from "./env";

export const postData = async (inputValue = {}, EndPoint) => {
    try {
        const response = await axios.post(`${BACKEND_URL + EndPoint}`, {
            ...inputValue
        }, { withCredentials: true, });
        // console.log('Data posted successfully:', response.data);
        return response

    } catch (error) {
        console.error('Error posting data:', error);
    }
};
export const postDataNoPayload = async (EndPoint, token, errFunction = () => { }) => {

    try {
        const response = await axios.post(
            `${BACKEND_URL + EndPoint}`,
            {},
            {
                withCredentials: true,  // Merge with headers
                headers: {
                    'Authorization': `Bearer`,  // Use token dynamically
                    'Content-Type': 'application/json',
                    'Auth': token

                }
            }
        );

        return response;

    } catch (error) {
        console.error('Error posting data:', error);
        errFunction()
    }
};


let client = null;

function createClient(username, password) {
    if (!client) {
        client = mqtt.connect(MQTT_SERVER, {
            username,
            password,
            reconnectPeriod: 30 * 1000, // Disable automatic reconnection
            keepalive: 30,
        });

        client.on('connect', () => console.log('Connected to MQTT broker'));
        client.on('close', () => {
            console.log('MQTT connection closed');
            client = null; // Reset client on disconnect
        });
    }
    return client;
}

export function getClient(username, password) {
    if (!client && username && password) {
        client = createClient(username, password);
    }
    return client;
}

