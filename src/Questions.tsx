import "./Questions.css"
// import { useState , useEffect} from "react"
import { clsx } from "clsx"
import type {JSX} from 'react'

type QuestionsProps = {
    questions: QuestionProps[];
    handleClick: (questionText: string, answer: string) => void;
};

export default function Questions({questions, handleClick, }: QuestionsProps):JSX.Element{

    const questionElements: JSX.Element[] = questions.map((question): JSX.Element => {
        
        
        return (
            
            <div key={question.question} className="question">
                <p className="question-text">{question.question}</p>
                <div className="answers">
                    {question.allAnswers.map((answer: string) => {
                        // const answerIsCorrect = (question.correct_answer == answer)
                        return (
                            <button key={answer} className={clsx("answer",{
                                selected: question.selectedAnswer === answer
                            })} /*className={props.isChoosen}*/  onClick={() => handleClick(question.question, answer)} >{answer}</button> 
                        )
                    })}
                </div>
                <hr />
            </div>
        
        )
    })
    return(
        <>
            {questionElements}
        </>
    )
}