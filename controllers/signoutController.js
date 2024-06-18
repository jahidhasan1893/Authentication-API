const User = require('../models/user');

module.exports.getSignout = (req, res)=>{
    res.clearCookie('token');
    res.redirect('/');
}