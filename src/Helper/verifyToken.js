const jwt = require("jsonwebtoken");
const User = require('../model/user.model');



const veriftToken = async (req , res , next)=> {
    try {
        let authorization = req.headers['authorization'];
        // console.log(typeof(authorization));

        if(!authorization){
            return res.json({message: 'Unauthorize User'});
        }
        let token = authorization.split(' ')[1];
        // console.log(token)
        let {userId} = jwt.verify(token , process.env.SECRET_KEY);
        // console.log(userId);

        req.user = await User.findById(userId);
        req.user ? next() : res.json({message: 'User Nt Found'});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = veriftToken;