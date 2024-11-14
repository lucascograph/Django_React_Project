import { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import VocabularyQuestions from '../../components/Keigo/vocabularyQuestions'
import SentenceQuestions from '../../components/Keigo/SentenceQuestions'

export default function Phonecall() {

    const [currentStage, setCurrentStage ] = useState(0)

    const handleClearedStage = () => {
        setCurrentStage((prev) => prev + 1)
    }

    return (
        <div>
            <Navbar />
            {currentStage === 0 && (
                <VocabularyQuestions questions={"hello"} onCleared={handleClearedStage}/>
            )}
            {currentStage === 1 && (
                <SentenceQuestions questions={"hello"} onCleared={handleClearedStage}/>
            )}
            {currentStage === 2 && (
                <div>HELLO</div>
            )}
            {currentStage === 3 && (
                <div>HELLO</div>
            )}
        </div>
    )
}
