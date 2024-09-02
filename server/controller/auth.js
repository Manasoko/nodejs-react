const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const UserDB = require('../models/user');

module.exports = router.post('/add-user', async (req, res, next) => {
    try {
        const { username, email, password, phoneNumber, confirmPassword } =
            req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'Password and confirm password do not match.',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await UserDB.create({
            name: username,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
        });
        req.session.user = user;
        req.session.isLoggedIn = true;

        req.session.save(err => {
            if (err) {
                console.log('Session save error:', err);
            } else {
                console.log('Session saved successfully');
            }
            res.redirect('/');
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log('A user with this email already exists.');
            res.status(400).json({
                error: 'A user with this email already exists.',
            });
        } else {
            console.error(error);
        }
    }
});

module.exports = router.post('/login-user', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log([username, email, password]);
        const user = await UserDB.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                error: 'User is not in databse. Create a new user',
            });
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            console.log('Password match. Proceeding...');
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            req.session.isLoggedIn = true;
            req.session.save(err => {
                if (err) return console.log('Session save error:', err);
            });
        } else {
            return res.status(404).json({
                message: 'Incorrect Password',
            });
        }
    } catch (error) {
        res.status(404).json({
            message: 'User Not Found',
        });
        console.log(error);
    }
});
