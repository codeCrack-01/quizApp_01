import React, {useEffect} from "react";
import axios from 'axios'

const Test01: React.FC = () => {

    const url = 'https://opentdb.com/api.php?amount=12&category=9&difficulty=easy&type=multiple';

    const fetchTriviaAPI = async () => {
        try {
            const response = await axios.get(url);
            console.log(response);
        } catch (error: any) {
            console.error("Error fetching the Quiz: ", error);
        }
    }

    useEffect(() => {
        fetchTriviaAPI();
     }, []);

    return (
        <>

        </>
    );
}

export default Test01