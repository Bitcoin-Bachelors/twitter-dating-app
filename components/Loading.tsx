import { useState, useEffect, Fragment } from 'react'
import { Transition } from '@headlessui/react'

const Loading = () => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        let mounted
        if(mounted) setTimeout(() => { setShow(true) }, 2000)
        return(() => { mounted = false })
    }, [])

    return (
        <>
            <div className="h-screen flex items-center justify-center absolute inset-0 overflow-hidden bg-gray-100 z-50">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-center">
                        <img src="/images/Bitcoin.png" className="h-16 animate-bounce w-16" alt="Bitcoin image" />
                    </div>
                    {show &&
                        <Transition
                            show={show}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <div>💸 Verified-Wealth Dating for Bitcoiners and No Coiners</div>
                        </Transition>}
                </div>
            </div>
        </>
    )
}

export default Loading