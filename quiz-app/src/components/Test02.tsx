import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TriviaQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

const Test02: React.FC = () => {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {shuffleArray([...question.incorrectAnswers, question.correctAnswer]).map((answer, idx) => (
                            <li key={idx}>{answer}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Test02;
