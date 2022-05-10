import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { signUp, signIn, answerCustomChallenge } from "../lib/auth"

// graphql mutations
import { withApollo } from '../lib/withApollo'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USERS, CREATE_USERS_BIO } from '../graphql'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const countryCode = [
    {
        "name": "United States",
        "dial_code": "+1",
        "code": "US"
    },
    {
        "name": "Canada",
        "dial_code": "+1",
        "code": "CA"
    },
    {
        "name": "United Kingdom",
        "dial_code": "+44",
        "code": "GB"
    },
    {
        "name": "Kenya",
        "dial_code": "+254",
        "code": "KN"
    }
]

const genderLists = [
    { id: 1, title: "Male" },
    { id: 2, title: "Female" }
]

const lookingForLists = [
    { id: 1, title: "a man" },
    { id: 2, title: "a female" }
]

const purposeLists = [
    { id: 1, title: "sugar daddy" },
    { id: 2, title: "sugar mommy" },
    { id: 3, title: "sugar baby" }
]

enum RegistrationStatus {
    USERNAME = "USERNAME",
    AUTHCODE = "AUTHCODE",
    GENDER = "GENDER",
    LOOKINGFOR = "LOOKINGFOR",
    PURPOSE = "PURPOSE"
}

function JoinBitcoinBachelors() {
    const [isLoading, setisLoading] = useState<Boolean>(false)
    const [username, setUserName] = useState<String>("")
    const [code, setAuthCode] = useState<String>("")
    const [phoneCode, setPhoneCode] = useState(countryCode[0].dial_code)
    const [genderSelection, setSelectedGender] = useState(genderLists[-1])
    const [purposeSelection, setSelectedPurpose] = useState(genderLists[-1])
    const [lookingForSelection, setSelectedLookingFor] = useState(genderLists[-1])
    const [status, setRegistrationStatus] = useState<string>(RegistrationStatus.GENDER)
    // graphql mutations
    const [addBios, { ...biosResponse }] = useMutation(CREATE_USERS_BIO)
    const [addUsers, { ...usersResponse }] = useMutation(CREATE_USERS)


    useEffect(() => {

        if (biosResponse &&
            biosResponse.data &&
            biosResponse.data.insert_bios &&
            usersResponse &&
            usersResponse.data &&
            usersResponse.data.insert_users) {
            handleSuccess()
        }
    }, [biosResponse, usersResponse])

    const handleSubmit = async (event?: React.MouseEvent<HTMLElement>) => {
        event?.preventDefault()

        try {
            console.log(username, code)
            const user: any = await answerCustomChallenge(username, code)
            if (user) {
                //const sessionConfig = await generateConfig()
                // create users information usersTable, biosTable, sessionsTable
                addUsers({ variables: { id: user.attributes.sub, userType: purposeSelection.title, email: "", phone_number: "" } })
                addBios({ variables: { id: user.attributes.sub, gender: genderSelection.title, looking_for: lookingForSelection.title } })
                //addSession({ variables: { id: user.attributes.sub, privateKey: sessionConfig.privateKey, publicKey: sessionConfig.publicKey, signature: JSON.stringify(sessionConfig.config) } })
            }
        } catch (error) {
            setisLoading(false)
        }
    }

    const createNewAccount = async () => {
        // create a new record on AWS Cognito
        try {
            await signUp(username)
            const userResponse = await signIn(username)
            setUserName(userResponse)
            setRegistrationStatus(RegistrationStatus.AUTHCODE)
            setisLoading(false)
        } catch (error) {
            console.log(error)
            setisLoading(false)
        }
    }

    const handleSuccess = () => {
        window.location.href = '/'
    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            {isLoading ? <Loading /> : <div className="px-4 w-full">
                <div className='max-w-lg mx-auto w-full p-4'>
                    {status == RegistrationStatus.GENDER && <Gender genderSelection={genderSelection} setSelectedGender={setSelectedGender} setisLoading={setisLoading} setRegistrationStatus={setRegistrationStatus} />}
                    {status == RegistrationStatus.LOOKINGFOR && <LookingFor lookingForSelection={lookingForSelection} setSelectedLookingFor={setSelectedLookingFor} setisLoading={setisLoading} setRegistrationStatus={setRegistrationStatus} />}
                    {status == RegistrationStatus.PURPOSE && <Purpose purposeSelection={purposeSelection} setSelectedPurpose={setSelectedPurpose} setisLoading={setisLoading} setRegistrationStatus={setRegistrationStatus} />}
                    {status == RegistrationStatus.USERNAME && <PhoneOrEmail createNewAccount={createNewAccount} setPhoneCode={setPhoneCode} phoneCode={phoneCode} setUserName={setUserName} setisLoading={setisLoading} />}
                    {status == RegistrationStatus.AUTHCODE && <AuthCode handleSubmit={handleSubmit} setAuthCode={setAuthCode} setisLoading={setisLoading} />}
                </div>
            </div>}
        </div>
    );
}

export default withApollo()(JoinBitcoinBachelors)

// Loading Component
function Loading() {
    return (
        <div>
            <img
                className="mx-auto h-12 w-auto animate-bounce"
                src="/images/Bitcoin.png"
                alt="Workflow"
            />
        </div>
    )
}
// Gender Component
interface GenderProps {
    genderSelection: {
        id: number
        title: string
    },
    setSelectedGender: any,
    setisLoading: (value: boolean) => void
    setRegistrationStatus: (value: string) => void
}
function Gender({ genderSelection, setSelectedGender, setisLoading, setRegistrationStatus }: GenderProps) {
    return (
        <div className='max-w-lg mx-auto w-full p-4'>
            <RadioGroup value={genderSelection} onChange={(event) => {
                setisLoading(true)
                setSelectedGender(event)
                setRegistrationStatus(RegistrationStatus.LOOKINGFOR)
                setTimeout(() => {
                    setisLoading(false)
                }, 1000);
            }}>
                <RadioGroup.Label className="text-base font-medium text-gray-900">I am a...</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {genderLists.map((genderList) => (
                        <RadioGroup.Option
                            key={genderList.id}
                            value={genderList}
                            className={({ checked, active }) =>
                                classNames(
                                    checked ? 'border-transparent' : 'border-gray-300',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                )
                            }
                        >
                            {({ checked, active }) => (
                                <>
                                    <div className="flex-1 flex">
                                        <div className="flex flex-col">
                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                {genderList.title}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                    <CheckCircleIcon
                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                        aria-hidden="true"
                                    />
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

// Looking For Component
interface LookingForProps {
    lookingForSelection: {
        id: number
        title: string
    },
    setSelectedLookingFor: any,
    setisLoading: (value: boolean) => void
    setRegistrationStatus: (value: string) => void
}
function LookingFor({ lookingForSelection, setSelectedLookingFor, setisLoading, setRegistrationStatus }: LookingForProps) {
    return (
        <div className='max-w-lg mx-auto w-full p-4'>
            <RadioGroup value={lookingForSelection} onChange={(event) => {
                setisLoading(true)
                setSelectedLookingFor(event)
                setRegistrationStatus(RegistrationStatus.PURPOSE)
                setTimeout(() => {
                    setisLoading(false)
                }, 1000);
            }}>
                <RadioGroup.Label className="text-base font-medium text-gray-900">I am looking for...</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {lookingForLists.map((lookingForList) => (
                        <RadioGroup.Option
                            key={lookingForList.id}
                            value={lookingForList}
                            className={({ checked, active }) =>
                                classNames(
                                    checked ? 'border-transparent' : 'border-gray-300',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                )
                            }
                        >
                            {({ checked, active }) => (
                                <>
                                    <div className="flex-1 flex">
                                        <div className="flex flex-col">
                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                {lookingForList.title}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                    <CheckCircleIcon
                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                        aria-hidden="true"
                                    />
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

// Purpose Component
interface PurposeProps {
    purposeSelection: {
        id: number
        title: string
    },
    setSelectedPurpose: any,
    setisLoading: (value: boolean) => void
    setRegistrationStatus: (value: string) => void
}
function Purpose({ purposeSelection, setSelectedPurpose, setisLoading, setRegistrationStatus }: PurposeProps) {
    return (
        <div className='max-w-lg mx-auto w-full p-4'>
            <RadioGroup value={purposeSelection} onChange={(event) => {
                setisLoading(true)
                setSelectedPurpose(event)
                setRegistrationStatus(RegistrationStatus.USERNAME)
                setTimeout(() => {
                    setisLoading(false)
                }, 1000);
            }}>
                <RadioGroup.Label className="text-base font-medium text-gray-900">I'm using this site as a...</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-3">
                    {purposeLists.map((purposeList) => (
                        <RadioGroup.Option
                            key={purposeList.id}
                            value={purposeList}
                            className={({ checked, active }) =>
                                classNames(
                                    checked ? 'border-transparent' : 'border-gray-300',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                )
                            }
                        >
                            {({ checked, active }) => (
                                <>
                                    <div className="flex-1 flex">
                                        <div className="flex flex-col">
                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                {purposeList.title}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                    <CheckCircleIcon
                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                        aria-hidden="true"
                                    />
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

// Phone or email component
interface PhoneOrEmailProps {
    phoneCode: string
    setPhoneCode: (value: any) => void
    setUserName: (value: string) => void
    setisLoading: (value: boolean) => void
    createNewAccount: () => void
}
function PhoneOrEmail({ phoneCode, setPhoneCode, setUserName, setisLoading, createNewAccount }: PhoneOrEmailProps) {
    const [toggleForm, setFormToggle] = useState<Boolean>(true)
    return (
        <div className='flex flex-col space-y-3'>
            <div>
                {toggleForm ? <div>
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                        Enter your phone number
                    </label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{phoneCode}</span>
                        </div>
                        <input
                            type="number"
                            name="phone-number"
                            id="phone-number"
                            onChange={(event) => setUserName(`${phoneCode}${event.target.value}`)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder=""
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="country" className="sr-only">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                onChange={(event) => { setPhoneCode(event.target.value) }}
                                autoComplete="country"
                                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                            >
                                {countryCode.map((country: any) => (
                                    <option value={country.dial_code} key={country.name}>{country.code}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div> : <div>
                    <label htmlFor="email" className="block text-base font-bold text-gray-700">
                        Enter your email
                    </label>
                    <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(event) => setUserName(event.target.value)}
                            className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            placeholder=""
                        />
                    </div></div>}
            </div>
            <div className="pt-2 pb-2">
                <button
                    type="button"
                    onClick={() => {
                        setisLoading(true)
                        createNewAccount()
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Next
                </button>
            </div>
            <div className="mt-6 ">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500"> Or continue with </span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button type="button"
                            onClick={() => {
                                setUserName("")
                                setFormToggle(!toggleForm)
                            }}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Toggle Email or Phone</span>
                        {toggleForm ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg> :  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>  }
                    </button>
                    <button type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Sign in with Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path
                                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='text-sm text-gray-400 pt-2'>By continuing you agree to Bitcoin Bachelor's Terms and Privacy Policy. Promoting illegal commercial activities (such as prostitution) is prohibited.
                If you are an ESCORT, DO NOT use this website.</div>

        </div>
    )
}

// Confirmation code component
interface AuthCodeProps {
    setAuthCode: (value: string) => void
    setisLoading: (value: boolean) => void
    handleSubmit: (event?: React.MouseEvent<HTMLElement>) => void
}
function AuthCode({ handleSubmit, setAuthCode, setisLoading }: AuthCodeProps) {
    return (<div className='flex flex-col space-y-3'>
        <label htmlFor="confirmation_code" className="block text-sm font-medium text-gray-700">
            Please enter the code sent to you.
        </label>
        <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
            <input
                type="text"
                name="confirmation_code"
                id="confirmation_code"
                onChange={(event) => setAuthCode(event.target.value)}
                className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                placeholder="Confirmation code"
            />
        </div>
        <button
            type="button"
            onClick={() => {
                setisLoading(true)
                handleSubmit()
            }}
            className="inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Next
        </button>
    </div>)
}






