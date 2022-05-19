import axios from "axios";

// list user messages
export const listuserdirectmessages = async () => {
    try {
            const config = {
                method: 'get',
                url: `http://localhost:4000/v1/list_twitter_messages`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            console.log("config", config)
           const response = await axios(config)
           return response
    } catch (error) {
        console.log(error)
    }
}

// list user messages
export const getuserdirectmessages = async (messageId) => {
    try {
            const config = {
                method: 'get',
                url: `http://localhost:4000/v1/get_twitter_message/${messageId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };
           const response = await axios(config)
           return response
    } catch (error) {
        console.log(error)
    }
}


// send message
export const senduserdirectmessages = async (message) => {
    try {
            const config = {
                method: 'post',
                url: `http://localhost:4000/v1/send_twitter_message`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: message
            };

            console.log("config", config)

           const response = await axios(config)
           return response
    } catch (error) {
        console.log(error)
    }
}

// delete direct messages
export const deleteuserdirectmessages = async (messageId) => {
    try {
        const config = {
            method: 'delete',
            url: `http://localhost:4000/v1/delete_twitter_message/${messageId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
       const response = await axios(config)
       return response
} catch (error) {
    console.log(error)
}
}