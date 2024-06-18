const User = require('../models/user');
const handleErrors = require('../middlewares/handleErrors');
const createToken = require('../middlewares/createToken');

const maxAge = 3*24*60*60;


module.exports.getSignup = (req, res)=>{
    res.render('signup');
};

module.exports.postSignup = async (req, res)=>{
    const { email, password } = req.body;

    try{
        const user = await User.create({ email, password });
        try{
            const token = createToken(user._id);
            res.cookie('token', token, {maxAge: maxAge});
            res.status(201).json({ user: user._id });
        }catch(err){
            console.log(err);
        }
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
};

