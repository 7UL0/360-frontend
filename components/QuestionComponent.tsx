import { useEffect, useState } from 'react';
import { fetchQuestions } from '../api';

function QuestionComponent() {
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(() => {
        async function getQuestions() {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        getQuestions();
    }, []); //axios 

    return (
        <div>
            <h1>Questions</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionComponent;
