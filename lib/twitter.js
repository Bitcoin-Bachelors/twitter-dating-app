
// list user messages
export const listuserdirectmessages = async () => {
    try {
            const config = {
                method: 'get',
                url: "http://localhost:4000/v1/twitter_messages",
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

// list user messages
export const getuserdirectmessages = async () => {
    try {
            const config = {
                method: 'get',
                url: "http://localhost:4000/v1/twitter_messages",
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
export const senduserdirectmessages = async () => {
    try {
            const config = {
                method: 'get',
                url: "http://localhost:4000/v1/twitter_messages",
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

// delete direct messages
export const deleteuserdirectmessages = async () => {
    try {
        const config = {
            method: 'get',
            url: "http://localhost:4000/v1/twitter_messages",
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