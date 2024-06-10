const bcrypt = require('bcryptjs');
const fs = require('fs');

const users = [
    {
        "id": 1,
        "username": "Marek11",
        "password": "Marek11"
    },
    {
        "id": 2,
        "username": "Jarek11",
        "password": "Jarek11"
    },
    {
        "id": 3,
        "username": "Arek11",
        "password": "Arek11"
    },
    {
        "id": 4,
        "username": "Darek11",
        "password": "Darek11"
    }
];

const hashPasswords = async () => {
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

hashPasswords();
