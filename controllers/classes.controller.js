const Class = require('../models/Class.model');

exports.getClasses = async function (req, res, next) {
    try {
        const classes = await Class.find();  // Trae todas las clases de la BD
        res.json(classes);
    } catch (err) {
        res.json({message: err})
    }
}

exports.createClass = async function (req, res, next) {
    const clas = new Class({
        profesor: req.body.profesor,
        nombre: req.body.nombre,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
    });
    try {
        const createdClass = await clas.save();
        res.json(createdClass);
    } catch (err) {
        res.json({message: err})
    }
}

exports.updateClass = async function (req, res, next) {
    try {
        const updatedClass = await Class.updateOne(
            { _id: req.params.userId }, //No se qué significa esto por ende no lo toco...
            { $set: { nombre: req.body.nombre }},
            { $set: { materia: req.body.materia }},
            { $set: { duracion: req.body.duracion }},
            { $set: { frecuencia: req.body.frecuencia }},
            { $set: { costo: req.body.costo }},
        );
        res.json(updatedClass);
    } catch (err) {
        res.json({message: err})
    }
}


exports.deleteClass = async function (req, res, next) {
    try {
        
    } catch (err) {
        res.json({message: err})
    }
}

exports.publicarClass = async function (req, res, next) {
    try {
        
    } catch (err) {
        res.json({message: err})
    }
}

exports.despublicarClass = async function (req, res, next) {
    try {
        
    } catch (err) {
        res.json({message: err})
    }
}