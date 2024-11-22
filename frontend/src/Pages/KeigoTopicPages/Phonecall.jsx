import { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import OptionQuestions from '../../components/Keigo/OptionQuestions'
import SentenceQuestions from '../../components/Keigo/SentenceQuestions'
import "./Phonecall.css"
import FullSentenceQuestions from '../../components/Keigo/FullSentenceQuestions'
import Roleplaysituations from '../../components/Keigo/RoleplayQuestions'

export default function Phonecall() {

    const [currentStage, setCurrentStage ] = useState(3)

    const handleClearedStage = () => {
        setCurrentStage((prev) => prev + 1)
    }

    return (
        <div>
            <Navbar />
            <div className='questionnaire'>
                {currentStage === 0 && (
                    <OptionQuestions onCleared={handleClearedStage}/>
                )}
                {currentStage === 1 && (
                    <SentenceQuestions onCleared={handleClearedStage}/>
                )}
                {currentStage === 2 && (
                    <FullSentenceQuestions onCleared={handleClearedStage} />
                )}
                {currentStage === 3 && (
                    <Roleplaysituations onCleared={handleClearedStage} />
                )}
            </div>
        </div>
    )
}
