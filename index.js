// We include the Express module in the project
const express = require('express');

// We can process the body of incoming POST requests with body-parser.
const bodyParser = require('body-parser');

// Cors: Used to allow requests from another device and application.
const cors = require('cors');

// We are creating the Express application
const app = express();
app.use(bodyParser.json());  // Body parser is used to process JSON data.
app.use(cors()); // Open the Cors servants

// We specify the port number
const PORT = 3001;

//An array to temporarily store users (normally a database is used)
const users = [];

// We define the /login endpoint for the post request.
// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(`Login attempt: username: ${username}, password: ${password}`);

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        console.log(`Login attempt: username: ${username}, ID: ${user.id}`);
        res.status(200).json({
            message: 'Login attempt!',
            user: {
                id: user.id,
                username: user.username
            }
        });
    } else {
        console.log('Invalid login information.');
        res.status(401).json({ message: 'Invalid login information' });
    }
});

// '/register endpoint for user registration
app.post('/register', (req, res) => {
const { username, password } = req.body;

// Invalid access control
if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required!' });
}
// Check if user is already registered 
const existingUser = users.find(user => user.name === username);
if (existingUser) {
    return res.status(409).json({ message: 'This username already exists!!' });
}
const newUser = {
    id: users.length + 1,
    username,
    password
};

users.push(newUser);

console.log(`New user registered: ${JSON.stringify(newUser)}`);
res.status(201).json({ message: 'User successfully registered!', user: newUser });

});

// We start the server and listen on the port number we specified
app.listen(PORT, () => {
    console.log(`Running on ${PORT} server port...`);
});