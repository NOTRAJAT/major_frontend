import axios from "axios";

export const postData = async (inputValue) => {
    try {
        const response = await axios.post('https://f585-103-204-161-192.ngrok-free.app/api/v1/register', {
            ...inputValue
        });
        // console.log('Data posted successfully:', response.data);
        return response

    } catch (error) {
        console.error('Error posting data:', error);
    }
};