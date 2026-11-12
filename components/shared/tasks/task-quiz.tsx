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
        <div className="w-full min-w-0">
            <div className="mb-4 flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <Progress className="h-3 w-full sm:w-1/3 sm:max-w-64 sm:shrink-0 sm:h-4" value={(currentQuestionIndex/questions.length)*100} />
                <p className="min-w-0 text-sm font-medium wrap-anywhere sm:text-base">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <Card className="w-full min-w-0 rounded-(--radius-2xl,40px) bg-white p-2 shadow-2xs sm:p-4 lg:p-6">
                <CardHeader className="flex min-w-0 items-center justify-center px-2 py-4 sm:px-4 sm:py-6">
                    <p className="w-full min-w-0 text-center text-xl leading-snug font-extrabold tracking-[-0.055em] text-[#29276f] wrap-anywhere min-[360px]:text-2xl sm:text-3xl xl:text-4xl">
                        {currentQuestion.text}
                    </p>
                </CardHeader>
                <CardContent className="min-w-0 px-0 sm:px-2">
                    <div className={currentQuestion.options.some((option) => option.length > 40) ? "grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4" : "grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4"}>
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedAnswer === option;
                            const isRightAnswer = option === currentQuestion.correctAnswer;

                            let buttonClass = "btn-secondary pastel-purple";

                            if (selectedAnswer && isRightAnswer) {
                                buttonClass = 'btn-secondary pastel-mint';
                            } 

                            if (selectedAnswer && isSelected && !isRightAnswer) {
                                buttonClass = 'btn-secondary pastel-pink';
                            }
                            return (
                                <button key={option} className={`${buttonClass} h-auto min-h-14 min-w-0 px-3 py-3 text-base leading-snug whitespace-normal wrap-anywhere sm:min-h-16 sm:px-4 sm:py-4 sm:text-lg`} onClick={() => handleAnswer(option)} disabled={selectedAnswer !== null}  >
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
                        <div className="mt-4 flex w-full min-w-0 justify-center">
                            <button className="btn-primary flex min-h-12 items-center justify-center gap-2 px-3 py-3 text-base wrap-anywhere sm:px-6" onClick={() => handleNextQuestion()}>
                                Next question <ArrowBigRight className="shrink-0"/>
                            </button>
                        </div>
                    )}

                    {selectedAnswer && isLastQuestion && (
                       <div className="mt-4 flex w-full min-w-0 flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                            <p className="min-w-0 text-center text-xl font-medium text-mint wrap-anywhere sm:text-2xl">
                                Your score: {score} / {questions.length}
                            </p>
                            <Link href='/subjects' className="btn-primary min-h-12 gap-2 px-3 py-3 text-base sm:px-6" >
                                Finish <ArrowBigRight className="shrink-0"/>
                            </Link>
                        </div>
                           
                    )}

                    
                </CardContent>
            </Card>
        </div>
         
    );
}

export default TaskQuiz;
