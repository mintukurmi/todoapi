const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');


// User sign up route
router.post('/signup', async (req, res) => {
    try {
        let {username, password, confirmPassword } = req.body;

        if(password != confirmPassword){
            throw new Error('Opps! Passwords didn\'t match');
        }

        password = await bcrypt.hash(password, 8);

        const user = new User({ username, password});
        
        await user.save()

        res.status(201).send({'success': 'User signed up successfully.'});

    }
    catch(err) {
        if(err.code === 11000){
            res.status(400).json({ error: 'Username already taken.'});
        }

        res.status(400).json({ error: err.message});
    }
})


// User Login route
router.post('/login', async (req, res) => {
    try{    

        const {username, password} = req.body;

        const user = await User.findByCredentials(username, password);

        if(!user){
            throw new Error("No user found");
        }

        const token = await user.generateAuthToken()

        res.json({ success: "Logged in successfully", auth_token: token })

    }
    catch(err) {
        res.status(400).send({error: err.message})
    }
})


// User logout route
router.post('/logout', auth, async (req, res) => {

    try {

        const user = req.user;

        if(!user){
            res.status(400).send({error: 'You are already logged out'})
        }

        user.tokens = [];
        await user.save();

        res.send({success: 'Logged out successfully'});

    }
    catch(err) {
        res.status(400).send({ error: err.message })
    }
})


module.exports = router;