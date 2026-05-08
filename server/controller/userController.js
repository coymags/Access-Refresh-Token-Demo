//Here is Where the logic start
const User = require('../model/userSchema')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_ACCESS_TOKEN, {expiresIn: '1h'})
}

const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'})
}

exports.createUser = async (req, res) => {

    try {
        //Deconstruction of req.body
        const { username, password } = req.body

        //Check Database if username is already exist
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(401),json({message: 'Email already exist'})
        }
        //Hash Password before sending it to database
        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt)

        //Sending user information to the database / store this data in users collection
        const userInfo = await User.create({
            username,
            password: hashPassword
        })

        res.status(201).json({message: 'User Registered Succesfully'})
    } catch (error) {
        console.error(error)
    }
}

exports.userLogin = async (req, res) => {

    try {
        const { username, password } = req.body 
        
        //Look for existing User in the database
        const user = await User.findOne({username})

        //If the Username is not in Database. This error message will be send to the frontend
        if(!user){
            return res.status(401).json({message: 'Enter a valid Username'})
        }
        //Matching normal password and hashpassword
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({message: 'Wrong Password'})
        }

        //Sending RefreshToken as http-only cookie
        res.cookie("refreshToken", generateRefreshToken(user.id), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //Username Exist and Password is match. Response will be send to the frontend
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error(error)
    }
}

exports.refreshToken = async (req, res) => {
    const token = req.cookies?.refreshToken
    console.log("Cookies:", req.cookies)
    console.log("Headers:", req.headers.cookie)
    console.log("Refresh Token:", token)
    try {
        if(!token){
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if(err){
                return res.sendStatus(403)
            }

            const accessToken = generateToken(decoded.id)

            res.json({accessToken})
        })
    } catch (error) {
        console.error(error)
    }
}
