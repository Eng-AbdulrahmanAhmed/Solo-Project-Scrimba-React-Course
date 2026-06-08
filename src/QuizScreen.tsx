import './QuizScreen.css'
import { useEffect, useState, type JSX } from 'react'
export default function QuizScreen() {

    type Question = {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
        allAnswers?: string[]; // Optional property if you combine them later
    }

    const [questions, setQuestions] = useState<Question[]>([])
    useEffect(() => {
        
        fetch("https://opentdb.com/api.php?amount=3")
        .then(res => res.json())
        .then(data => {
            const formatted = data.results.map((q:Question):Question[]=>{
                const allChoices = [...q.incorrect_answers]
                const randomIndex = Math.floor(Math.random() * (allChoices.length + 1))
                allChoices.splice(randomIndex , 0 ,q.correct_answer)
                console.log("shuffled all choices :" + allChoices)
                console.log("Correct Answer" + q.correct_answer)
                return {
                    ...q,
                    allAnswers: allChoices,   
                }
                
            });
            setQuestions(formatted)
           
         })
        .then(() => setQuestions((prevData) =>{
            return prevData.map((q: Question) => {
                
                return {
                    ...q,
                    allAnswers: [...q.incorrect_answers, q.correct_answer],              
                }
                
            })
        }),)
        // .then(() => setQuestions(prevData =>{console.log(prevData)}))
    }, [])
        questions.map((q)=>{
            console.log("cateogery : "+ q.category + "\n type : " + q.type + "\n diff : " + q.difficulty + "\n question : "+ q.question + "\n correct : " + q.correct_answer + "\n incorrect : " + q.incorrect_answers + "\n the shuffled answers" + q.allAnswers)})

    const questionElements: JSX.Element[] = questions.map((question: { question: string; incorrect_answers: string[]; correct_answer: string }): JSX.Element => {
        return (
            <div key={question.question} className="question">
                <p className="question-text">{question.question}</p>
                <div className="answers">
                    
                    {question.incorrect_answers.map((answer: string) => {
                        return <button key={answer} className="answer">{answer}</button>
                    })}
                    {
                        <button key={question.correct_answer} className="answer correct">{question.correct_answer}</button>
                    }
                </div>
                <hr />
            </div>
        )
    })

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
                    {questionElements}
                </div>
                {questions.length > 0 && (
                    <button className="submit-button">Submit Answers</button>
                )}
            </section>
        </>
    )
}