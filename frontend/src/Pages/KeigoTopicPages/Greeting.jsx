import { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import OptionQuestions from '../../components/Keigo/OptionQuestions'
import SentenceQuestions from '../../components/Keigo/SentenceQuestions'
import "./Greeting.css"
import FullSentenceQuestions from '../../components/Keigo/FullSentenceQuestions'
import Roleplaysituations from '../../components/Keigo/RoleplayQuestions'

import greetingData from '../../data/greetings_data.json';

export default function Phonecall() {

  const greetings_images = []

    const [currentStage, setCurrentStage ] = useState(0)

    const handleClearedStage = () => {
        setCurrentStage((prev) => prev + 1)
    }

    return (
        <div>
            <Navbar />
            <div className='phonecall-questionnaire'>
                {currentStage === 0 && (
                    <OptionQuestions onCleared={handleClearedStage} keigoData={greetingData["questions"]} images={greetings_images}/>
                )}
                {currentStage === 1 && (
                    <SentenceQuestions onCleared={handleClearedStage} keigoData={greetingData["sentence_transformations"]} images={greetings_images}/>
                )}
                {currentStage === 2 && (
                    <FullSentenceQuestions onCleared={handleClearedStage} keigoData={greetingData["sentence_checks"]} images={greetings_images} />
                )}
                {currentStage === 3 && (
                    <Roleplaysituations onCleared={handleClearedStage} keigoData={greetingData["roleplay"]} images={greetings_images} />
                )}
                {currentStage > 3 && (
                    <div className='cleared-text'>
                        CONGRATULATIONS YOU DID IT !!!!!
                    </div>
                )}
            </div>
        </div>
    )
}
