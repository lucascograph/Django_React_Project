import { useState } from "react"
import "./RoleplayQuestions.css"
import image_1 from "../../images/phonecall_1.jpg"
import image_3 from "../../images/phonecall_3.jpg"
import Button from "../Button/Button"

function RoleplayQuestions({ onCleared }) {
    const situations = [
        { id: 1, names: ["田中", "中村", "関口"], situation: ["あとで掛けなおすということを伝えてください", "「」という伝言を伝えてください"], image: image_1 },
    ]

    const conversation = [
            "はい、123株式会社でございます。",
            "",
            "申し訳ございませんが、田中はただいま会議中でございます。何か伝言がございましたら、教えてください",
            "さようでございますか。では、よろしくお願いいたします。",
            "失礼いたします。"
        ]


    const [currentSituation, setCurrentSituation] = useState(0)
    const [instruction, setInstruction] = useState(`${situations[currentSituation].names[0]}さんに電話をかけ、出られない場合： ${situations[currentSituation].situation[0]}`)
    const [feedback, setFeedback] = useState("")
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [instructionMode, setInstructionMode] = useState(true)
    const [userInput, setUserInput] = useState("")
    const [userConversation, setUserConversation] = useState([])

    const handleStartClick = () => {
        setInstructionMode(false)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setUserConversation([...userConversation, userInput])
            setUserInput("")
        }
    }

    return (
        <div className="question-container">
            {instructionMode ? (
                <div className="instruction-container">
                    <div className="instruction">
                        {instruction}
                    </div>
                    <Button onClick={handleStartClick}>Start</Button>
                </div>
            ) : (
                <>
                <div className="roleplay-container">
                    <div className="user-chat">
                        {userConversation.map((sentence, index) => (
                            <div key={index}>{sentence}</div>
                        ))}
                    </div>
                    <div className="cpu-chat">
                        {conversation.map((sentence, index) => (
                            index < userConversation.length + 1 ?
                                <div key={index}>{sentence}</div> : null
                        ))}
                    </div>
                </div>
                {!hideInputField ? (
                    <>
                    <div className="feedback">
                        {feedback}
                    </div>
                    <input
                        className="sentence-input"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Answer here"
                    />
                    </>
                ) : (
                    <div className="feedback">
                        {isCorrect ? <span className="correct">{feedback}</span> : <span className="incorrect">{feedback}</span>}
                    </div>
                )}
                </>
            )}
        </div>
    )
}

export default RoleplayQuestions
