const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user into database
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
      [fullName, email, passwordHash]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.insertId,
        fullName,
        email
      }
    });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get user data
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check for user
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // In a full app, you would generate and return a JWT here.
    // For now, we'll just return the user data so the frontend can store it in localStorage.
    res.json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        name: user.full_name, // Map full_name to name for frontend compatibility
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
