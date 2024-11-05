import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";

const vocabularyQuestions = [
    { id: 1, word: "(自分が）来る", options: ["伺う", "参る", "お目にかかる", "拝見する"], correct: "参る" },
    { id: 2, word: "（自分が）言う", options: ["ご覧になる", "申す", "伺う", "差し上げる"], correct: "申す" },
    { id: 3, word: "見る", options: ["ご覧になる", "拝見する", "伺う", "差し上げる"], correct: "拝見する" },
];

const sentenceExercises = [
    { id: 1, sentence: "私はアメリカから来た", normal: "来た", keigo: "参りました" },
    { id: 2, sentence: "<名前>と言う", blank: "申します" },
];

const Introduction = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentSentence, setCurrentSentence] = useState(0);
    const [isVocabularyComplete, setIsVocabularyComplete] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleAnswerClick = (option) => {
        const correctAnswer = vocabularyQuestions[currentQuestion].correct;
        if (option === correctAnswer) {
            setFeedback("Correct!");
            if (currentQuestion < vocabularyQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setFeedback("");
                }, 1000);
            } else {
                setIsVocabularyComplete(true);
                setFeedback("Vocabulary section complete! Moving to sentence exercises.");
                setTimeout(() => setFeedback(""), 2000);
            }
        } else {
            setFeedback("Incorrect, try again!");
        }
    };

    const handleSentenceSubmit = () => {
        const correctAnswer = sentenceExercises[currentSentence].keigo;
        if (userInput === correctAnswer) {
            setFeedback("Correct!");
            setUserInput("");
            if (currentSentence < sentenceExercises.length - 1) {
                setTimeout(() => {
                    setCurrentSentence((prev) => prev + 1);
                    setFeedback("");
                }, 1000);
            } else {
                setFeedback("Great job! You've completed all exercises for this topic.");
            }
        } else {
            setFeedback("Incorrect, try again.");
        }
    };

    return (
        <div>
            <Navbar />
            {feedback && <p>{feedback}</p>}

            {!isVocabularyComplete ? (
                <div>
                    <h2>Vocabulary Quiz</h2>
                    <p>Select the correct keigo word for: <strong>{vocabularyQuestions[currentQuestion].word}</strong></p>
                    {vocabularyQuestions[currentQuestion].options.map((option, index) => (
                        <Button standard key={index} onClick={() => handleAnswerClick(option)}>
                            {option}
                        </Button>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Sentence Transformation</h2>
                    <p>
                        Transform the following sentence into keigo:
                        <br />
                        <strong>{sentenceExercises[currentSentence].sentence}</strong>
                    </p>
                    {sentenceExercises[currentSentence].sentence.replace(sentenceExercises[currentSentence].normal, "")}
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your answer here"
                    />
                    <Button standard onClick={handleSentenceSubmit}>Check</Button>
                </div>
            )}
        </div>
    );
};

export default Introduction;
