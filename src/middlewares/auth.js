const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// env config
dotenv.config()


const auth = async function (req, res, next){

    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user){
            throw new Error();
        }

        req.user = user;

        next()
    }
    catch(err) {
        res.status(401).send({error: 'Please login first'})
    }

}


module.exports = auth