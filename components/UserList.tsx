import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    username: string;
    role: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/users') //axios zamiast fetcha
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    throw new Error('Data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
