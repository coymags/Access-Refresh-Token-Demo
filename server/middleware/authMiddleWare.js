const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {

    let token

    if(!token){
        return res.status(401).json({message: 'Not Authorize, No Token'})
    }

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            //Get token from Headers
            token = req.headers.authorization.split('')[1]

            //Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN)

            //Attached user info to request
            // req.user = decoded this will gey the user information from the database
            req.user = await User.findById(decoded.id).select("-password")

            //Move to the next parameter in controller
            next()
        } catch (error) {
            return res.status(401).json({message: 'Not Authorize, Token Failed'})
        }
    }
}

module.exports = protect