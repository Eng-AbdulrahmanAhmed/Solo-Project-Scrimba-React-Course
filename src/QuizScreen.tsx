import { useState  , useEffect} from 'react';
import Questions from './Questions';
import './QuizScreen.css'

export type QuestionProps = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    allAnswers: string[]; 
    selectedAnswer?: string;
}

export default function QuizScreen() {

    const [isGameOver , setIsGameOver] = useState<boolean>(false)
    const [gameCount , setGameCount] = useState<number>(0)
    const [questions, setQuestions] = useState<QuestionProps[]>([])

    useEffect(() => {  
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    const formatted:QuestionProps[] = data.results.map((q:Omit<QuestionProps , "allAnswers">)=>{
                        const allChoices = [...q.incorrect_answers]
                        const randomIndex = Math.floor(Math.random() * (allChoices.length + 1))
                        allChoices.splice(randomIndex , 0 ,q.correct_answer)
                        return {
                            ...q,
                            allAnswers: allChoices,  
                            selectedAnswer: undefined, 
                        }
                    });
                    setQuestions(formatted)
                }
            })
    },[gameCount]) 
    
    function handleClick(questionText: string, answer: string) {
        setQuestions(prev =>
            prev.map(q =>
                q.question === questionText
                    ? { ...q, selectedAnswer: answer }
                    : q
            )
        );
    }
    
    function countCorrectAnswers():number {
        return questions.reduce((count, q) => {
            return (q.selectedAnswer === q.correct_answer) ? count + 1 : count;
        }, 0);
    }

    function submitAnswers(){
        setIsGameOver(true)
    }

    function playAgain(){
        setGameCount(prev => prev + 1)
        setIsGameOver(false)
        setQuestions([]) // clear previous questions
    }

    return (
        <>
            <section className="quiz-screen">

                <svg className="blob1" width="158" height="141" viewBox="0 0 158 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M62.5096 81.3947C34.2214 50.8508 -3.58201 21.7816 0.272833 -19.6933C4.5395 -65.599 38.9541 -105.359 81.5192 -123.133C121.897 -139.994 169.136 -130.256 204.922 -105.149C235.047 -84.0141 235.923 -43.8756 245.241 -8.27104C255.27 30.0508 281.621 70.8106 259.601 103.779C236.639 138.159 188.091 143.432 147.031 138.768C111.418 134.723 86.8506 107.677 62.5096 81.3947Z" fill="#FFFAD1"/>
                </svg>

                <svg className="blob2" width="148" height="118" viewBox="0 0 148 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
                </svg>

                <div className="questions-container">
                    <Questions questions={questions} handleClick={handleClick}  isGameOver={isGameOver} />
                </div>

                {questions.length > 0 && !isGameOver &&
                    <button className="submit-button" onClick={submitAnswers}>Submit Answers</button>
                } 
                {isGameOver &&
                    <div className="score-container">
                        <h1>You scored {countCorrectAnswers()} / {questions.length} correct answers</h1>
                        <button className="submit-button" onClick={playAgain}>Play Again</button> 
                    </div>
                }
            </section>
        </>
    )
}