const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const UserDB = require('../models/user');

exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    try {
        const { username, email, password, phoneNumber } =
            req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        req.session.user = await UserDB.create({
            name: username,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber,
        });
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
            return res.status(400).json({
                error: 'A user with this email already exists.',
            });
        } else {
            console.error(error);
        }
    }
};

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    try {
        const { username, email, password } = req.body;
        const user = await UserDB.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                error: 'User is not in database. Create a new user',
            });
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            console.log('Password match. Proceeding...');
            req.session.user = {
                id: user.id,
                name: username,
                email: email,
            };
            req.session.isLoggedIn = true;
            await req.session.save(err => {
                if (err)
                    return res.status(404).json({
                        message: 'Session not saved',
                    });
            });
            console.log(req.session.user);
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
};
