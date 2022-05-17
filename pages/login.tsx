import React, { useState } from "react"
import { signIn, answerCustomChallenge } from "../lib/auth"
import { ExclamationIcon } from '@heroicons/react/solid'

enum LoginStatus {
    USERNAME = "USERNAME",
    AUTHCODE = "AUTHCODE",
}

export default function LoginToBitcoinBachelors() {
    const [username, setUsername] = useState<string>("")
    const [code, setAuthCode] = useState<string>("")
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>("")
    const [status, setLoginStatus] = useState<string>(LoginStatus.USERNAME)

    const handleAuthEmail = async (event?: React.MouseEvent<HTMLElement>) => {
        event?.preventDefault()
        try {
            setisLoading(true)
            const user = await signIn(username)
            setUsername(user)
            setisLoading(false)
            setLoginStatus(LoginStatus.AUTHCODE)
        } catch (error) {
            setError(error)
            setisLoading(false)
        }
    }

    const handleAuthCode = async (event?: React.MouseEvent<HTMLElement>) => {
        event?.preventDefault()
        try {
            setisLoading(true)
            const user: any = await answerCustomChallenge(username, code)
            console.log(user)
            window.location.href = '/'
        } catch (error) {
            setError(error)
            setisLoading(false)
        }
    }

    const handleTwitterLogin = async () => {
        try {
            // Authenticate using via passport api in the backend
            // Open Twitter login page
            // Upon successful login, a cookie session will be stored in the client
            window.open("http://localhost:4000/v1/twitter", "_self");
        } catch (error) {

        }
    }

    return (<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <a href="/">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/images/Bitcoin.png"
                    alt="Workflow"
                />
            </a>
            <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {error && error.message && <div className="mb-4"><ErrorAlert errorText={error.message} /></div>}

            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {status == LoginStatus.USERNAME && <GetAuthChallenge handleTwitterLogin={handleTwitterLogin} setUsername={setUsername} isLoading={isLoading} handleAuthEmail={handleAuthEmail} />}
                {status == LoginStatus.AUTHCODE && <AnswerChallenge setAuthCode={setAuthCode} isLoading={isLoading} handleAuthCode={handleAuthCode} />}
            </div>
        </div>
    </div>)
}


interface GetAuthChallengeProps {
    setUsername: (value: string) => void
    isLoading: boolean
    handleAuthEmail: () => void
    handleTwitterLogin: () => void
}

function GetAuthChallenge({ setUsername, isLoading, handleAuthEmail, handleTwitterLogin }: GetAuthChallengeProps) {
    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="email_phone_number" className="block text-sm font-medium text-gray-700">
                    Email address or Phone number
                </label>
                <div className="mt-1">
                    <input
                        id="email_phone_number"
                        name="email_phone_number"
                        type="text"
                        onChange={(event) => { setUsername(event.target.value) }}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="text-xs text-gray-400">Please provide the country prefix code, i.e., USA is +1 if you use a phone number.</div>
                </div>
            </div>

            <div>
                <button
                    type="button"
                    onClick={handleAuthEmail}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLoading ? <div className="animate-pulse">One moment...</div> : <div>Next</div>}
                </button>
            </div>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500"> Or continue with </span>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="button"
                        onClick={() => {
                            handleTwitterLogin()
                        }}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Sign in with Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path
                                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-500">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                By continuing you agree to Bitcoin Bachelor's Terms and Privacy Policy. Promoting illegal commercial activities (such as prostitution) is prohibited.
                If you are an ESCORT, DO NOT use this website.
            </p>
        </form>
    )
}

interface ChallengeProps {
    setAuthCode: (value: string) => void
    isLoading: boolean
    handleAuthCode: () => void
}

function AnswerChallenge({ setAuthCode, isLoading, handleAuthCode }: ChallengeProps) {
    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Please enter the code sent to you.
                </label>
                <div className="mt-1">
                    <input
                        id="code"
                        name="code"
                        type="text"
                        onChange={(event) => { setAuthCode(event.target.value) }}
                        required
                        placeholder="Confirmation Code"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <button
                    type="button"
                    onClick={handleAuthCode}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLoading ? <div className="animate-pulse">Processing...</div> : <div>Next</div>}
                </button>
            </div>
        </form>
    )
}

interface IProps {
    errorText: string
}

function ErrorAlert({ errorText }: IProps) {
    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">
                        {errorText}
                    </p>
                </div>
            </div>
        </div>
    )
}