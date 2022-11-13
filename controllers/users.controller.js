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
    if(error) return res.status(400).send(error.details[0].message);
    
    // Verifico que no exista el mismo usuario
    const mailExist = await User.findOne({mail: req.body.mail});
    if (mailExist) return res.status(400).send("Email already exists")

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Creo el usuario
    const user = new User({
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: hashPassword,
        rol: req.body.rol
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
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        // Verifico email
        const user = await User.findOne({mail: req.body.mail});
        if (!user) return res.status(400).send("EMAIL or password invalid");
        // Verifico password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Email or PASSWORD invalid");

        //Creo JWT y lo asigno
        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
        res.header('auth-token', token).send(token);

}