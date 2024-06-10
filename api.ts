import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export async function fetchUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; 
    }
}

export async function fetchQuestions() {
    try {
        const response = await axios.get(`${BASE_URL}/questions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
