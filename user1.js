const express = require('express');
const Router = express.Router();
const userdb = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const secret = 'code123';
// Routes

// Test route all users
Router.get('/allusers', async (req, res) => {
    try {
        const users = await userdb.find({});
        res.json(users);
    } catch (err) {
        res.status(400).send(err.message);
    }

   
});

// Signup route
Router.post('/users/res', async (req, res) => {
    const { username, name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);// Hash password
        const newUser = new userdb({ username, name, email, password: hashedPassword, role });


        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Login route

Router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userdb.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        // Save user information in session
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete user
Router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userdb.findByIdAndDelete(userId);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Protected route
Router.get('/protected', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('You are not authenticated');
    }
    res.send(`مرحبًا ${req.session.user.email}. هذه صفحة محمية.`);
})

// Admin panel route
Router.get('/admin/panel', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    res.send('Hello to the admin panel');
});

// Logout route
Router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.json({ message: 'Logout successful' });
    });
});

// Update user
Router.patch('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await userdb.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) return res.status(404).send('User not found');
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get user profile
Router.get('/users/profile/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userdb.findById(userId);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Export the router
module.exports = Router;
