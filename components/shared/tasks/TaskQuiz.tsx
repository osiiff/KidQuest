"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";


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

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if(!currentQuestion) {
        return (
                <Card>
                    <CardContent>
                    <p>
                        Great job! Your score: {score} / {questions.length}
                    </p>
                    </CardContent>
                </Card>
            );
    }


    return (
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
                        <p>
                            Correct!
                        </p>
                    )}
                    {isCorrect === false && (
                        <p>
                            Wrong!
                        </p>
                    )}

                    {selectedAnswer && !isLastQuestion && (
                        <div className="w-full flex justify-center">
                            <button className="flex align-middle justify-center gap-2 btn-primary">
                                Next question <ArrowBigRight/>
                            </button>
                        </div>
                    )}

                    {selectedAnswer && isLastQuestion && (
                        <div className="w-full flex justify-center">
                            <button className="flex align-middle justify-center gap-2 btn-primary">
                                Finish
                            </button>
                        </div>
                    )}
                    
                </CardContent>
            </Card>
    );
}

export default TaskQuiz;