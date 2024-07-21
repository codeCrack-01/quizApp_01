import React, { useState, useEffect } from "react"
import './static/QuizPage.css'
import axios from 'axios';
import $ from 'jquery';

interface TriviaQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

const QuizPage: React.FC = () => {

    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [q_index, setQ_Index] = useState<number>(1);
    const [correctResponses, setResponses] = useState<number>(0);

        // Function to generate a new URL
        const generateUrl = () => {
            const baseUrl = 'https://the-trivia-api.com/api/questions?';
            const amount = 10; // You can change this to the desired number of questions
            const category = 'general'; // You can change this to the desired category
            return `${baseUrl}limit=${amount}&categories=${category}`;
        };
    
        const fetchTriviaAPI = async () => {
            setLoading(true);
            setError(null);  // Clear any existing errors
            const url = generateUrl();
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
    
        const shuffleArray = (array: string[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const Q_by_Index = () => {

            var i = q_index;
            
            if (i <= questions.length) {
                var current_question = questions[i];

                return (
                    <>
                        <h6 className="qTitle">{current_question.question}</h6>
                        <br />
                        <div className="button-container">
                            {shuffleArray([...current_question.incorrectAnswers, current_question.correctAnswer]).map((answer, idx) => (
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
                setQ_Index(q_index + 1);
                // alert('Correct ! ' + c_id);
            }
            else {
                $('#' + id_num).css({
                    'background-color': 'var(--wrong)'
                });
                // alert('Wrong ! ' + c_id);
            }
        }
    
        useEffect(() => {
            fetchTriviaAPI();
        }, []); // The empty dependency array ensures this runs only once when the component mounts
    
        if (loading) {
            return <div>Loading...</div>;
        }
    
        if (error) {
            return <div>{error}</div>;
        }
    
        return (
            <div className="quiz-container">
                {Q_by_Index()}
            </div>
        );
}

export default QuizPage;