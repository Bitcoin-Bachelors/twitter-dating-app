import { createContext, useContext, useEffect, useState } from 'react'
import { useFetchUser } from './user'

const UserContext = createContext()
const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
    let localUserType

    if (typeof window !== 'undefined') {
        localUserType = JSON.parse(localStorage.getItem('userType'))
    }

    // user not hooked up, try useFetchUser() instead
    const [user, setUser] = useState()
    const [userType, setUserType] = useState(localUserType)
    const [userBio, setUserBio] = useState({})
    const [userSession, setUserSession] = useState(null)
    const [userStatus, setStatus] = useState(false)
    const [userPhoto, setUserPhoto] = useState()

    // pagination
    const [userProspects, setUserProspects] = useState([])
    const [prospectPage, setProspectPage] = useState(1)

    useEffect(() => {
        if (userType != 0) {
            localStorage.setItem('userType', JSON.stringify(userType))
        }
    }, [userType])

    const values = {
        userStatus, setStatus,
        userSession, setUserSession,
        userPhoto, setUserPhoto,
        user, setUser,
        userType, setUserType,
        userBio, setUserBio,
        prospectPage, setProspectPage,
        userProspects, setUserProspects
    }

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )
}

export { useUser, UserProvider }