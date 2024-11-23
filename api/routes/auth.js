const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
// Register
router.post('/register', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body for debugging

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            console.log('Existing User Found:', existingUser); // Log existing user for debugging
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            console.log('Existing Email Found:', existingEmail); // Log existing email for debugging
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        });

        // Save the new user to the database
        const user = await newUser.save();
        console.log('New User Saved:', user); // Log the new user for debugging
        res.status(201).json(user);
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging purposes
        res.status(500).json({ error: 'An error occurred, please try again later' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong password or username!");
        }
  const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin},
    process.env.SECRET_KEY,{expiresIn:"5d"}
  )


        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong password or username!");
        }
 const {password, ...info } = user._doc;
        res.status(200).json({...info, accessToken});
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging purposes
        res.status(500).json({ error: 'An error occurred, please try again later' });
    }
});

module.exports = router;
