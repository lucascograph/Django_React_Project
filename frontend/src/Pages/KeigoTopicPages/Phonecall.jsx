import { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import OptionQuestions from '../../components/Keigo/OptionQuestions'
import SentenceQuestions from '../../components/Keigo/SentenceQuestions'
import "./Phonecall.css"
import FullSentenceQuestions from '../../components/Keigo/FullSentenceQuestions'
import Roleplaysituations from '../../components/Keigo/RoleplayQuestions'
import image_1 from "../../images/phonecall_1.jpg"
import image_2 from "../../images/phonecall_2.jpg"
import image_3 from "../../images/phonecall_3.jpg"

import keigoData from '../../data/phonecall_data.json'


export default function Phonecall() {
    
    const phonecall_images = [image_1, image_2, image_3]
    const [currentStage, setCurrentStage ] = useState(0)
    console.log(currentStage)

    const handleClearedStage = () => {
        setCurrentStage((prev) => prev + 1)
    }

    return (
        <div>
            <Navbar />
            <div className='phonecall-questionnaire'>
                {currentStage === 0 && (
                    <OptionQuestions onCleared={handleClearedStage} keigoData={keigoData["questions"]} images={phonecall_images}/>
                )}
                {currentStage === 1 && (
                    <SentenceQuestions onCleared={handleClearedStage} keigoData={keigoData["sentence_transformations"]} images={phonecall_images}/>
                )}
                {currentStage === 2 && (
                    <FullSentenceQuestions onCleared={handleClearedStage} keigoData={keigoData["sentence_checks"]} images={phonecall_images} />
                )}
                {currentStage === 3 && (
                    <Roleplaysituations onCleared={handleClearedStage} keigoData={keigoData["roleplay"]} images={phonecall_images} />
                )}
                {currentStage > 3 && (
                    <div className='cleared-text'>
                        CONGRATULATIONS, YOU DID IT!
                    </div>
                )}
            </div>
        </div>
    )
}
