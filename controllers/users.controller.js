const User = require('../models/User.model');

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
    res.json(user);
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
    const user = new User({
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: req.body.password,
        rol: req.body.rol
    });
    try {
        const createdUser = await user.save();
        res.json(createdUser);
    } catch (err) {
        res.json({message: err})
    }
}