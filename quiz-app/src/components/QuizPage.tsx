import React, { useState, useEffect } from "react"
import './static/QuizPage.css'
import axios from 'axios';
import $ from 'jquery';
import LoaderComponent from "./Loader";
import { Logic } from "./functions/Logic";

interface TriviaQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

enum CheckResponse {
    CORRECT,
    WRONG,
    UNDEFINED
}

const QuizPage: React.FC = () => {

    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const logicFunction = new Logic();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [q_index, setQ_Index] = useState<number>(1);
    const [check, setCheck] = useState<CheckResponse>(CheckResponse.UNDEFINED);

    
    const fetchTriviaAPI = async () => {
        setLoading(true);
        setError(null);  // Clear any existing errors
        const url = logicFunction.generateUrl();
        try {
            const response = await axios.get(url);
            setQuestions(response.data);
        } catch (error) {
            console.error("API Error => ", error);
            setError("Error fetching the Quiz ...");
        } finally {
            setLoading(false);
        }
    };

    const Q_by_Index = () => {

        var i = q_index;
        
        if (i <= questions.length) {
            var current_question = questions[i];

            return (
                <>
                    <h1>Question No.{i} </h1>
                    <p className="qTitle">{current_question.question}</p>
                    <br />
                    <div className="button-container">
                        {logicFunction.shuffleArray([...current_question.incorrectAnswers, current_question.correctAnswer]).map((answer, idx) => (
                            <button id={idx.toString()} className="mcq-button" key={idx} onClick={() => validateAnswer(answer, idx)}>{answer}</button>
                        ))}
                    </div>
                </>
            );
        }
    }

    const validateAnswer = (value: string, id_num: number) => {

        if (value == questions[q_index].correctAnswer) {
            $('#' + id_num).css({
                'background-color': 'var(--correct)'
            });
            setCheck(CheckResponse.CORRECT);
        }
        else {
            $('#' + id_num).css({
                'background-color': 'var(--wrong)'
            });
            setCheck(CheckResponse.WRONG);
        }
    }
    
    
    useEffect(() => {
        fetchTriviaAPI();
    }, []); // The empty dependency array ensures this runs only once when the component mounts


    const ShowCorrect = () => {
        return (
            <>
                <LoaderComponent q_id={q_index} nextQ={setQ_Index} changeState={setCheck} />
                <h1>You're Right !</h1>
                <p className="qTitle">`{questions[q_index].correctAnswer}` is the correct answer.</p>
            </>
        );
    }
    const ShowIncorrect = () => {
        return (
            <>
                <LoaderComponent q_id={q_index} nextQ={setQ_Index} changeState={setCheck} />
                <h1>Wrong Answer</h1>
                <p className="qTitle">The correct answer is :`{questions[q_index].correctAnswer}`.</p>
            </>
        );
    }

    
    if (loading) {
        return <div className="quiz-container"><h1>Loading...</h1></div>;
    }
    if (error) {
        return <div className="quiz-container">{error}</div>;
    }

    /* Main Return Statements */
    if (check == CheckResponse.UNDEFINED) {
        return (
            <div className="quiz-container">
                {Q_by_Index()}
            </div>
        );
    }
    else if (check == CheckResponse.CORRECT) {
        return (
            <div className="quiz-container">
                {ShowCorrect()}
            </div>
        );
    }
    else {
        return (
            <div className="quiz-container">
                {ShowIncorrect()}
            </div>
        );
    }
}

export default QuizPage;