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
    console.log(req.body)
    const id = ID()
    User.sync({ alter: true })
    try{
        const user = await User.create({displayName, email, password, id})
        const token = createJWT(user.id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user})
    }catch(err){
        let errors = alertError(err)
        res.status(400).json({errors : errors})
    }
}

module.exports.login = (req, res) =>{
    const {email, password} = req.body
    try{
        User.findAll({where:{email:email, password:password}, raw:true}).then(users=>{
            const user = users[0]
            console.log(user)
            const token = createJWT(user.id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json({user})
        }).catch(err=>console.log(err));
    }catch(err){
        let errors = alertError(err)
        res.status(400).json({errors : errors})
    }
}

module.exports.verifuyser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'chatroom secret', (err, decodedToken) => {
            if(err){
                console.log(err)
            }else{
                console.log(decodedToken)
                const {id} = decodedToken
                const user = User.findAll({where:{id:id}, raw:true}).then(user => {
                    res.json(user[0])
                    next()
                })
            }
        })
    }else{
        next()
    }
}

module.exports.logout = (req, res) =>{
    res.cookie('jwt', "", {maxAge:1})
    res.status(200).json({logout:true})
}