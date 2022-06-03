
import axios from "axios";

// list user messages
export const listuserdirectmessages = () => {
   
    const config = {
        method: 'get',
        url: 'http://localhost:4000/v1/twitter/direct_message/list/',
        headers: {
            'Content-Type': 'application/json',
          },
        withCredentials: true 
      };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// delete direct message using messageId
export const deleteuserdirectmessages = (messageId) => {
    const config = {
        method: 'get',
        url: `http://localhost:4000/v1/twitter/direct_message/remove/?message_id=${messageId}`,
        headers: { 
            'Content-Type': 'application/json', 
          },
        withCredentials: true,
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get direct message using messageId
export const getuserdirectmessages = (messageId) => {
    const config = {
        method: 'get',
        url: `http://localhost:4000/v1/twitter/direct_message/remove/?message_id=${messageId}`,
        headers: { 
            'Content-Type': 'application/json', 
          },
        withCredentials: true,
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// send direct message provide message and recipientId
export const senduserdirectmessages =(message, recipientId) => {
    const data = JSON.stringify({
        "recipient_id": recipientId,
        "text": message
      });

    const config = {
        method: 'get',
        url: 'http://localhost:4000/v1/twitter/direct_message/send/',
        headers: { 
            'Content-Type': 'application/json', 
          },
        withCredentials: true,
        data : data
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// logout
export const logout = () => {
    const config = {
        method: 'get',
        url: `http://localhost:4000/v1/auth/twitter/logout/`,
        headers: { 
            'Content-Type': 'application/json', 
          }
    };

    axios(config)
        .then(function (response) {
            return JSON.stringify(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}