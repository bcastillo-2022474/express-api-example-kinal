const {Animal} = require("../models/animal")
const {Router} = require('express');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {
    getAnimals,
    postAnimal,
    getAnimalById,
    putAnimalById,
    deleteAnimalById
} = require("../controllers/animal.controller");

const route = Router();

route.route('/')
    .get(getAnimals)
    .post([
        check("nombre", "El nombre debe tener mas de 2 caracteres").isLength({min: 3}),
        check("expectativa_de_vida", "La expectativa de vida debe ser un numero").isNumeric(),
        check("especie", "La especie no puede estar vacia").not().isEmpty(),
        check("peso", "El peso debe ser un numero").isNumeric(),
        check("altura", "La altura debe ser un numero").isNumeric(),
    ], postAnimal)

route.route("/:id")
    .get([
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(async (id) => {
            const animal = await Animal.findById(id)
            if (!animal) throw new Error("No existe ningun animal con ese ID");
        }),
        validarCampos
    ], getAnimalById)
    .put([
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(async (id) => {
            const animal = await Animal.findById(id)
            if (!animal) throw new Error("No existe ningun animal con ese ID");
        }),
        validarCampos
    ], putAnimalById)
    .delete([
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(async (id) => {
            const animal = await Animal.findById(id)
            if (!animal) throw new Error("No existe ningun animal con ese ID");
        }),
    ], deleteAnimalById)

module.exports = route