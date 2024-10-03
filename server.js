import express from 'express';
import { createConnection } from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret_key_here';  // Change this to a strong secret

// MySQL Database connection
const db = createConnection({
    host: 'localhost',
    user: 'root',  // Your MySQL username
    password: 'Vineet@123',  // Your MySQL password
    database: 'login_system',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});


// Whitelist of valid Bootes email addresses
const validBootesEmails = [
    'kashif.mansoorie@bootes.in',
    'rashmi.soni@bootes.in',
    'deepak@bootes.in',
    'manab.r@bootes.in',
    'urvashi.agarwal@bootes.in',
    'oliver.p@bootes.in',
    'vishal.ag@bootes.in',
    'gaurav.yadav@bootes.in',
    'jitendar.goyal@bootes.in',
];



// **New Signup Route**
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Ensure email is only allowed from the "bootes.in" domain
    if (!email.endsWith('@bootes.in')) {
        return res.status(400).json({ success: false, message: 'Only @bootes.in emails are allowed' });
    }

    // Check if the email is in the whitelist
    if (!validBootesEmails.includes(email)) {
        return res.status(400).json({ success: false, message: 'You are not authorized to sign up with this email' });
    }

    // Ensure password has at least 5 characters
    if (password.length < 5) {
        return res.status(400).json({ success: false, message: 'Password must be at least 5 characters long' });
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ success: false, message: 'Error hashing password' });

        // Insert the user into the database
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error signing up' });
                }
                res.json({ success: true, message: 'User registered successfully' });
            }
        );
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Ensure email is only allowed from the "bootes.in" domain
    if (!email.endsWith('@bootes.in')) {
        return res.status(400).json({ success: false, message: 'Only @bootes.in emails are allowed' });
    }

    // Check if email is valid and exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error fetching user' });

        if (result.length === 0) {
            return rs.ines.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const user = result[0];

        // Compare the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ success: false, message: 'Error comparing passwords' });
            if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        });
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
