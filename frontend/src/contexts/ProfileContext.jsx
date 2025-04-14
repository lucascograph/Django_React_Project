import { createContext, useState, useEffect } from 'react'
import api from '../Api'

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {

    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await api.get("api/profile/")
                setProfileData(response.data)
            } catch (error) {
                console.error("Error fetching profile:", error)
            }
        }

        fetchDecks()

    }, [])

    const editProfileInfo = async (image, bio, email, phone_number) => {
        const formData = new FormData()
        formData.append("profile_image", image)
        formData.append("bio", bio)
        formData.append("email", email)
        formData.append("phone", phone_number)

        try {

            const response = await api.patch("api/profile/", formData)

            return response.data
        } catch (error) {
            console.error("Error editing profile:", error)
        }
    }

    const value = {
        profileData,
        editProfileInfo
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
