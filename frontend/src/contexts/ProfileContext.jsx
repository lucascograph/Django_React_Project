import { createContext, useState, useEffect } from 'react'
import api from '../Api'
import dayjs from "dayjs"

export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {

    const [profileData, setProfileData] = useState({})
    const [ userProgressId, setUserProgressId ] = useState(null)
    const [ clearedCards, setClearedCards ] = useState(null)
    const [ clearedBunpo, setClearedBunpo ] = useState(null)


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

    const ensureTodayProgress = async () => {
        try {
            const response = await api.get("api/progress/today/")
            setUserProgressId(response.data.id)
            return response.data.id
        } catch (error) {
            console.error("Error creating or getting progress:", error)
        }
    }

    const addClearedFlashcard = async (flashcardId) => {
        try {
            const progressId = userProgressId || await ensureTodayProgress()

            const response = await api.post("api/progress/cleared/flashcard/", {
                progress_id: progressId,
                flashcardId: flashcardId,
            })

            return response.data
        } catch (error) {
            console.error("Error adding cleared flashcard:", error)
        }
    }

    const fetchClearedFlashcards = async () => {
        try {
            const today = dayjs().format("YYYY-MM-DD")
            const response = await api.get(`api/progress/cleared/flashcard/list/`, { date: today })

            const cardIds = response.data.map(item => item.flashcard)
            setClearedCards(cardIds)
            return cardIds
        } catch (error) {
            console.error("Error fetching cleared flashcards:", error)
        }
    }

    const addClearedBunpo = async (bunpoId) => {
        try {
            const progressId = userProgressId || await ensureTodayProgress()

            const response = await api.post("api/progress/cleared/bunpo/", {
                progress_id: progressId,
                bunpoId: bunpoId,
            })

            return response.data
        } catch (error) {
            console.error("Error adding cleared bunpo:", error)
        }
    }

    const fetchClearedBunpos = async () => {
        try {
            const today = dayjs().format("YYYY-MM-DD")
            const response = await api.get(`api/progress/cleared/bunpo/list/`, { date: today })

            const bunpoIds = response.data.map(item => item.bunpo.id)
            setClearedBunpo(bunpoIds)
            return bunpoIds
        } catch (error) {
            console.error("Error fetching cleared bunpos:", error)
        }
    }



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
        clearedCards,
        clearedBunpo,
        editProfileInfo,
        ensureTodayProgress,
        addClearedFlashcard,
        fetchClearedFlashcards,
        addClearedBunpo,
        fetchClearedBunpos,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
