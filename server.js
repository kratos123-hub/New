import express from 'express';
import pkg from 'pg';  // Use default import for pg module
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

const { Pool } = pkg;  // Destructure Pool from the default import

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret_key_here';  // Change this to a strong secret

// PostgreSQL Database connection using environment variables
const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL Database:', err);
        process.exit(1);
    } else {
        console.log('Connected to PostgreSQL Database!');
    }
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
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',  // PostgreSQL uses $1, $2 for placeholders
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
    db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error fetching user' });

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ success: false, message: 'Error comparing passwords' });
            if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        });
    });
});

// Default route for the root path
app.get('/', (req, res) => {
  res.send('Backend service is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
