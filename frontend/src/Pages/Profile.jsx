import { Navbar } from "../components/Navbar/Navbar"
import { useState, useEffect, useContext, useRef } from "react"
import Button from "../components/Button/Button"
import { FlashcardContext } from '../contexts/FlashcardContext'
import { ProfileContext } from '../contexts/ProfileContext'
import { CiEdit } from "react-icons/ci";
import "./Profile.css"

function Profile() {
    const {
        ensureTodayProgress,
        fetchClearedFlashcards,
    } = useContext(FlashcardContext)

    const {
        profileData,
        editProfileInfo,
    } = useContext(ProfileContext)

    const [progressId, setProgressId] = useState(null)
    const [clearedCardIds, setClearedCardIds] = useState([])

    const [bio, setBio] = useState(profileData?.bio || "")
    const [email, setEmail] = useState(profileData?.email || "")
    const [phone, setPhone] = useState(profileData?.phone || "")

    const [selectedImage, setSelectedImage] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const fileInputRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            const id = await ensureTodayProgress()
            setProgressId(id)
            const list = await fetchClearedFlashcards()
            setClearedCardIds(list)
        }

        fetchData()
    }, [])

    useEffect(() => {
        setBio(profileData?.bio || "")
        setEmail(profileData?.email || "")
        setPhone(profileData?.phone || "")
        console.log(profileData)
    }, [profileData])

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            editProfileInfo(file, bio, email, phone)
        }
    }

    const handleBioEditToggle = () => {
        setIsEditing((prev) => !prev)
    }

    const handleSave = () => {
        try {
            editProfileInfo(selectedImage, bio, email, phone)
            console.log("Saving:", selectedImage, bio, email, phone)
            setIsEditing(false)
        } catch (error) {
            console.error("Update failed:", error)
            alert("Something went wrong!")
        }
    }

    const contactInfo = [
        { label: 'Email', value: email || 'Not set' },
        { label: 'Phone nr', value: phone || 'Not set' },
    ]

    return (
        <div>
            <Navbar />
            <div className="profile-page">
                <div className="user-info">
                    <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                        <img
                            src={
                                selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : profileData?.profile_image 
                                ? `${import.meta.env.VITE_BACK_URL}${profileData.profile_image}`
                                : "No image found"
                            }
                            alt="Profile"
                            style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "50%" }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        {profileData?.username}
                    </div>
                    <div className="user-data">
                        {isEditing ? (
                            <div className="edit-bio">
                                <div className="edit-bio-text">
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <div className="edit-contact">
                                    <div className="contact-object">
                                        <div className="label">Email:</div>
                                        <div className="value">
                                            <textarea
                                                rows={1}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="contact-object">
                                        <div className="label">Phone nr:</div>
                                        <div className="value">
                                            <textarea
                                                rows={1}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-buttons">
                                    <Button standard onClick={handleSave}>Update</Button>
                                    <Button standard onClick={() => setIsEditing(false)}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="user-data">
                                <div className="display-bio">
                                    <div className="display-text">
                                        {bio || "No bio set."}
                                    </div>
                                </div> 
                                <div className="display-contact">
                                    {contactInfo.map((info, index) => (
                                        <div className="display-contact-object" key={index}>
                                            <div className="display-label">{info.label}:</div><div className="display-value">{info.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <Button standard onClick={handleBioEditToggle} >Edit</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="progress-info">
                    <div>✅ Cleared Cards Today: {clearedCardIds.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile
