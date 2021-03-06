import { useState } from "react"
import { deleteuserdirectmessages, getuserdirectmessages, listuserdirectmessages, senduserdirectmessages } from "../../lib/twitter"
import { listcashapppayments } from "../../lib/cashapp"

const LandingPage = () => {
    const [messageId, setMessageId] = useState("")
    const [message, setMessage] = useState("")
    const [recipientId, setRecipientId] = useState("25035311")


    // handle list direct messages
    const handleListDirectMessages = async () => {
        const response = await listuserdirectmessages()
        console.log("listed direct message response", response)
    }

    // handle send direct messages
    const handleSendDirectMessages = async () => {
        const response = await senduserdirectmessages(message, recipientId)
        setMessage("")
        setRecipientId("25035311")
        console.log("sent message response", response)
    }

    // handle get direct messages
    const handleGetDirectMessages = async () => {
        const response = await getuserdirectmessages(messageId)
        setMessageId("")
        console.log("get direct message response", response)
    }

    // handle delete direct messages
    const handleDeleteDirectMessages = async () => {
        const response = await deleteuserdirectmessages(messageId)
        setMessageId("")
        console.log("delete direct message response", response)
    }

    // handle link cash app
    const handleLinkCashApp = () => {
        window.open("http://127.0.0.1:4000/v1/auth/cashapp/authorize/", "_self");
    }

    const handleListCashappPayments = async () => {
        const response = await listcashapppayments()
        console.log("listed cashapp payments response", response)
    }



    return (
        <div className="max-w-lg mx-auto py-12 flex flex-col space-y-4">
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>Connect your cashapp account.</div>
                <div className="mt-6">
                    <button type="button"
                        onClick={() => {
                            handleLinkCashApp()
                        }}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Connect Cashapp Account</span>
                        <img src="/images/logocashapp.png" alt="cashapp logo" className="h-5" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>This will test listing of cashapp payments. Ensure you have linked your cashapp account</div>
                <div>
                    <button
                        onClick={handleListCashappPayments}
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        List Cashapp Payments
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>This will test listing of users direct messages. Ensure you have logged in with Twitter to</div>
                <div>
                    <button
                        onClick={handleListDirectMessages}
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        List Direct Messages
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>This will test getting users direct messages using direct message id. Ensure you have logged in with Twitter to</div>
                <div>
                    <label htmlFor="email" className="sr-only">
                        Direct Message Id
                    </label>
                    <input
                        type="text"
                        name="twtter-id"
                        onChange={(event) => { setMessageId(event?.target.value) }}
                        id="twitter-id"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Provide direct message id"
                    />
                </div>
                <div>
                    <button
                        onClick={handleGetDirectMessages}
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Get Direct Messages
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>This will test listing of users direct messages. Ensure you have logged in with Twitter to</div>
                <div>
                    <label htmlFor="email" className="sr-only">
                        Direct Message ID
                    </label>
                    <input
                        type="text"
                        name="twtter-id"
                        onChange={(event) => { setMessageId(event?.target.value) }}
                        id="twitter-id"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Provide direct message id"
                    />
                </div>
                <div>
                    <button
                        onClick={handleDeleteDirectMessages}
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Delete Direct Message
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-4 rounded-md shadow space-y-3">
                <div>This will test sending direct message to a user. Ensure you have logged in with Twitter.</div>
                <div>
                    <label htmlFor="comment" className="sr-only">
                        Recipient Id
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="recipient-id"
                            onChange={(event) => { setRecipientId(event?.target.value) }}
                            id="recipient-id"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Provide recipient id"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="sr-only">
                        Add a message
                    </label>
                    <div className="mt-1">
                        <textarea
                            rows={4}
                            name="message"
                            id="message"
                            onChange={(event) => { setMessage(event?.target.value) }}
                            placeholder="Write a message"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={''}
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleSendDirectMessages}
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Send Direct Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage