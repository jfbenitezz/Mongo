const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { validateLogin } = require('../middleware/validator');

const loginUser = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }   

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('auth-token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); 

    // Send a response to the client
    res.send('Logged in successfully');
}
module.exports = { loginUser }