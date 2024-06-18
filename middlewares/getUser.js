require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = process.env.SECRET_KEY;

const getUser = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
        res.locals.user = null;
        next();
    }
    else{
        jwt.verify(token, secretKey, async(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
}

module.exports = getUser;