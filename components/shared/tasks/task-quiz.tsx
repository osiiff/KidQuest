"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";


type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

type TaskQuizProps = {
  questions: Question[];
};


const TaskQuiz = ({questions}: TaskQuizProps) => {
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [ selectedAnswer, setSelectedAnswer ] = useState<string | null>(null);
    const [ isCorrect, setIsCorrect ] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (option: string) => {
        if(selectedAnswer) return;

        setSelectedAnswer(option);

        if(option === currentQuestion.correctAnswer) {
            setIsCorrect(true);
            setScore((prev) => prev + 1);
        } else {
            setIsCorrect(false);
        }
    }

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setCurrentQuestionIndex((prev) => prev + 1)
    }

    const isLastQuestion = currentQuestionIndex === questions.length -1;


    

    return (
        <div className="w-full">
            <div className="flex justify-end p-4 w-full gap-3">
                <Progress className="w-3/12 flex top-1 h-4" value={(currentQuestionIndex/questions.length)*100} />
                <p className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <Card className="bg-white border-rounded shadow-2xs w-full p-4">
                <CardHeader className="flex-center p-4">
                    <p className="hero-title text-3xl">
                        {currentQuestion.text}
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 h-fit p-4">
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedAnswer === option;
                            const isRightAnswer = option === currentQuestion.correctAnswer;

                            let buttonClass = "btn-secondary pastel-purple h-36";

                            if (selectedAnswer && isRightAnswer) {
                                buttonClass = 'btn-secondary pastel-mint h-36';
                            } 

                            if (selectedAnswer && isSelected && !isRightAnswer) {
                                buttonClass = 'btn-secondary pastel-pink h-36';
                            }
                            return (
                                <button key={option} className={buttonClass} onClick={() => handleAnswer(option)} disabled={selectedAnswer !== null}  >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                    {isCorrect === true && (
                        <div className="flex w-full justify-center pb-4">
                            <p className="hero-text text-2xl text-mint flex justify-center">
                                Correct!
                            </p>
                        </div>
                    )}
                    {isCorrect === false && (
                        <div className="flex w-full justify-center pb-4">
                            <p className="hero-text text-2xl text-red-400 flex justify-center">
                                Wrong!
                            </p>
                        </div>
                    )}

                    {selectedAnswer && !isLastQuestion && (
                        <div className="w-full flex justify-center">
                            <button className="flex align-middle justify-center gap-2 btn-primary" onClick={() => handleNextQuestion()}>
                                Next question <ArrowBigRight/>
                            </button>
                        </div>
                    )}

                    {selectedAnswer && isLastQuestion && (
                       <div className="w-full flex justify-center gap-2">
                            <p className="hero-text text-2xl text-mint">
                                Your score: {score} / {questions.length}
                            </p>
                            <Link href='/subjects' className="btn-primary" >
                                Finish <ArrowBigRight/>
                            </Link>
                        </div>
                           
                    )}

                    
                </CardContent>
            </Card>
        </div>
         
    );
}

export default TaskQuiz;