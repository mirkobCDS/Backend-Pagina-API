const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model');
const { newUserValidation } = require('../validation');
const { loginValidation } = require('../validation');

exports.getUsers = async function (req, res, next) {
    try {
        const users = await User.find();  // Trae todos los usuarios de la BD
        res.json(users);
    } catch (err) {
        res.json({message: err})
    }
}

exports.getUserById = async function (req, res, next) {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch (err) {
        res.json({message: err})
    }
}

exports.deleteById = async function (req, res, next) {
    try {
    const removedUser = await User.remove({_id: req.params.userId});
    res.json(removedUser);
    } catch (err) {
        res.json({message: err})
    }
}

exports.updateUser = async function (req, res, next) {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { nombre: req.body.nombre }}
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err})
    }
}

exports.createUser = async function (req, res, next) {
    // Validacion de datos del usuario
    const {error} = newUserValidation(req.body);
    if(error){
        if (error.details[0].message == '"password" length must be at least 3 characters long'){
            return res.status(400).send("-2");
        }
        else if((error.details[0].message == '"telefono" is not allowed to be empty') || (error.details[0].message == '"telefono" length must be at least 10 characters long') ){
            return res.status(400).send("-4");
        }
        else{
            return res.status(400).send("-3");
        }
    }
    
    // Verifico que no exista el mismo usuario
    const mailExist = await User.findOne({mail: req.body.mail});
    if (mailExist) return res.status(400).send("-1")

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Creo el usuario
    const user = new User({
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: hashPassword,
        rol: req.body.rol,
        respuesta: req.body.respuesta,
        telefono:  req.body.telefono
    });
    try {
        const createdUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).json({message: err})
    }
}


exports.loginUser = async function (req, res, next) {
    // Valido datos para login
        // Verifico email
        const user = await User.findOne({mail: req.body.mail});
        const error = { 
            id: -1};
        if (!user) return res.status(400).send(JSON.stringify(error));
        // Verifico password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send(JSON.stringify(error));
        //Creo JWT y lo asigno
        const data = { rol: user.rol,
            id: user._id};
        
        
        res.status(200).send(JSON.stringify(data));

}