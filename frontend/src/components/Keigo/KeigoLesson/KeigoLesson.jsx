import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import "./KeigoLesson.css"


const lessonData = {
    1: {
        title: 'Phone Conversation',
        image: 'phone-conversation.png',
        description: 'In this lesson, you will learn how to properly speak on the phone using Keigo...',
        grammarPoints: [
            { title: 'Grammar Point 1', content: 'Explanation of the first grammar point...' },
            { title: 'Grammar Point 2', content: 'Explanation of the second grammar point...' },
            // Add more grammar points...
        ],
        quiz: [
            { question: 'How do you say "May I speak to Mr. Tanaka?"', answer: '田中さんはいらっしゃいますか？' },
            // Add more questions...
        ]
    },
    // Add more lessons here...
}

export const KeigoLesson = () => {
    const { lessonId } = useParams()
    const [ lesson, setLesson ] = useState(null)

    useEffect(() => {
        const selectedLesson = lessonData[lessonId]
        setLesson(selectedLesson)
    }[lessonId])

    if (!lesson) return <div>Loading...</div>

    return (
        <div className="Lesson-container">
            <h1>{lesson.title}</h1>
            <img src={lesson.image} alt={lesson.title} className="lesson-image" />
            <p>{lesson.description}</p>

            <div className="grammar-section">
                {lesson.grammarPoints.map((point, index) => (
                    <div key={index} className="grammar-card">
                        <h2>{point.title}</h2>
                        <p>{point.content}</p>
                    </div>
                ))}
            </div>

            <div className="quiz-section">
                {lesson.quiz.map((question, index) => (
                    <div key={index} className="quiz-card">
                        <p>{question.question}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
