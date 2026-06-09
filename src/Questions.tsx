import "./Questions.css"
// import { useState , useEffect} from "react"
import { clsx } from "clsx"
import type {JSX} from 'react'

type QuestionsProps = {
    questions: QuestionProps[];
    handleClick: (questionText: string, answer: string) => void;
    isGameOver: boolean;
};

export default function Questions({questions, handleClick,isGameOver }: QuestionsProps):JSX.Element{

    const questionElements: JSX.Element[] = questions.map((question): JSX.Element => {
        
        
        return (
            
            <div key={question.question} className="question">
                <p className="question-text">{question.question}</p>
                <div className="answers">
                    {question.allAnswers.map((answer: string) => {
                        return (
                            <button key={answer} className={clsx("answer",{
                                selected: question.selectedAnswer === answer,
                                correct: isGameOver && answer === question.correct_answer,
                                wrong: isGameOver && question.selectedAnswer === answer && answer !== question.correct_answer,
                                // correct: checkCorrectAnswers,
                            })} onClick={() => !isGameOver && handleClick(question.question, answer)}  >{answer}</button> 
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