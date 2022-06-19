
import axios from "axios";


// listcashapppayments
export const listcashapppayments = () => {
    const config = {
        method: 'get',
        url: `http://localhost:4000/v1/cashapp/payments/list`,
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
