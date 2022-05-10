import {useState} from "react";
import { useMutation } from '@apollo/react-hooks'
import {UPDATE_USERS} from '../../graphql'

const Onboarding = () => {
    const [username, setUserName] = useState("")
    const [updateUsers, { ...usersResponse }] = useMutation(UPDATE_USERS)

    const handleOnboarding = () => {
       console.log(username)
        //updateUsers()
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1>Onboarding</h1>
            <input
                id="username"
                name="username"
                type="text"
                required
                onClick={(event: any) => { setUserName(event.target.value)}}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
            />
            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleOnboarding}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update account
                </button>
            </div>

        </div>

    )
}

export default Onboarding