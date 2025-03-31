import { useEffect, useState } from "react"
import "./RoleplayQuestions.css"
import image_1 from "../../images/phonecall_1.jpg"
import image_3 from "../../images/phonecall_3.jpg"
import Button from "../Button/Button"
import RoleplayHelpText from "./RoleplayHelpText"

function RoleplayQuestions({ onCleared }) {
    const instructions = [
        { id: 1, names: ["田中", "中村", "関口"], situation: ["あとで掛けなおすということを伝えてください", "「」という伝言を伝えてください"], image: image_1 },
    ]

    const situations = {
        "Call back": {
            "はい、123株式会社でございます。": [/^(?:.+株式会社の|株式会社.+の).+?と申します$/],
            "お世話になっております。": [/^(?:こちらこそ、)?お世話になっております[。、 .]+(?:田中|たなか|タナカ)(?:様|さま|サマ)がいらっしゃいますか$/],
            "申し訳ございませんが、田中はただいま会議中でございます。何か伝言がございましたら、教えてください": [/^(?:結構です|けっこうです)(?:。|、)(?:お戻り|おもどり|御戻り|ご戻り|ごもどり)は(?:何時|何じ|なん時|なんじ)(?:頃|ごろ)(?:でしょうか|ですか)$/],
            "おそらく4時半頃になると思います。": [/^(?:承知しました|承知いたしました|承知致しました|しょうちしました|しょうちいたしました|しょうち致しました)(?:。)?(?:後程|後ほど|のちほど)(?:かけ直します|かけなおします|掛け直します|掛けなおします)$/],
            "かしこまりました。では、よろしくお願いいたします。": [/^(?:お忙|おいそが)しい(?:ところ|中|なか)(?:、| |　)ありがとうございました(?:。|、)(?:それでは、)?(?:失礼|しつれい)(?:します|いたします)(?:、|。)?$/],
            // "失礼いたします。": []
        },
        "underconstruction": {
            "はい、123株式会社でございます。": [/^(?:.+株式会社の|株式会社.+の).+?と申します$/],
        },
    }

    const helpText = [
        "Greet with name and company",
        "reply politely and ask to speak with Tanaka",
        "Decline + ask when the person will be back",
        "Let the person know you will call be",
        "Thank for the call (during busy hours), and say the closing phrase of the call",
    ]

    const [currentSituation, setCurrentSituation] = useState(0)
    const [themes, setThemes] = useState(Object.keys(situations))
    const [currentTheme, setCurrentTheme] = useState(themes[currentSituation])
    const [sentences, setSentences] = useState([])
    const [instruction, setInstruction] = useState("text here")
    const [feedback, setFeedback] = useState("")
    const [isCorrect, setIsCorrect] = useState(false)
    const [hideInputField, setHideInputField] = useState(false)
    const [instructionMode, setInstructionMode] = useState(true)
    const [userInput, setUserInput] = useState("")
    const [userConversation, setUserConversation] = useState([])

    useEffect(() => {
        const newSentences = Object.keys(situations[currentTheme])
        setSentences(newSentences)
    },[currentSituation])

    const handleStartClick = () => {
        setInstructionMode(false)
    }

    function checkSentenceInput(userinput, regexcodes) {
        for (const regexPattern of regexcodes){
            if (regexPattern.test(userinput)){
                return true
            } else {
                return false
            }
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const expectedResponses = situations[currentTheme][sentences[userConversation.length]]

            if (checkSentenceInput(userInput, expectedResponses)){
                const newUserConversation = [...userConversation, userInput];
                setUserConversation(newUserConversation)
                setUserInput("")

                if (newUserConversation.length === sentences.length) {
                    const nextSituationIndex = currentSituation + 1;
                    if (nextSituationIndex < themes.length) {
                        setCurrentSituation(nextSituationIndex);
                        setCurrentTheme(themes[nextSituationIndex]);
                        setUserConversation([]);
                    } else {
                        onCleared()
                    }
                }
            } else {
                setFeedback("try again")
                setIsCorrect(false)
                setHideInputField(true)
                setTimeout(() => {
                    setFeedback("")
                    setHideInputField(false)
                }, 1500);
            }
        }
    }

    return (
        <>
        <RoleplayHelpText text={helpText[userConversation.length]}/>
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
                            <div key={index}>- {sentence}</div>
                        ))}
                    </div>
                    <div className="cpu-chat">
                        {sentences.map((sentence, index) => (
                            index < userConversation.length + 1 ?
                                <div key={index}>- {sentence}</div> : null
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
        </>
    )
}

export default RoleplayQuestions
