const User = require('../models/user')
const jwt = require('jsonwebtoken')
const maxAge = 5 * 24 * 60 * 60
const ID = require('../ID')

const createJWT = id => {
    return jwt.sign({id}, 'chatroom secret', {
        expiresIn: maxAge
    })
}

const alertError = (err) => {
    let errors = { name: '', email: '', password: '' }

    if(err.message === 'incorrect email'){
        errors.email = 'This email not found'
    }

    if(err.message === 'incorrect password'){
        errors.password = 'The password is incorrect'
    }

    if(err.code === 11000){
        errors.email = 'This email already registered'
        return errors
    }

    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}
module.exports.signup = async (req, res) =>{
    const {displayName, email, password} = req.body
    User.sync({ alter: true })
    try{
        const id = ID()
        const user = await User.create({displayName, email, password, id})
        const token = createJWT(user.id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user})
    }catch(err){
        let errors = alertError(err)
        res.status(400).json({errors : errors})
    }
}

module.exports.login = async (req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({where:{email:email, password:password}, raw:true})
        const token = createJWT(user.id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user})
    }catch(err){
        let errors = alertError(err)
        res.status(400).json({errors : errors})
    }
}

module.exports.verifyuser = async (req, res) => {
    const token = req.cookies.jwt
    if(token){
        const decodedToken = jwt.verify(token, 'chatroom secret')
        const {id} = decodedToken
        const user = await User.findOne({where:{id:id}, raw:true})
        res.json(user)
    }
}

module.exports.logout = (req, res) =>{
    res.cookie('jwt', "", {maxAge:1})
    res.status(200).json({logout:true})
}