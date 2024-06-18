const User = require('../models/user');
const bcrypt = require('bcrypt');
const createToken = require('../middlewares/createToken');

const maxAge = 3*24*60*60;

module.exports.getSignin = (req, res) => {
    res.render('signin');
};

module.exports.postSignin = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user._id);
                res.cookie('token', token, { maxAge: maxAge });
                return res.status(201).json({ user: user._id });
            } else {
                return res.status(400).json({ error: 'incorrect password' });
            }
        } else {
            return res.status(400).json({ error: 'incorrect email' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'An error occurred during sign-in' });
    }
};
