const Animal = require("../models/animal");

const getAnimals = async (req, res) => {
    const {desde = 0, limite = 5} = req.query
    const filter = {tp_estado: true}
    console.log(Animal)
    const [total, animals] = await Promise.all([Animal.countDocuments(filter), Animal.find(filter).skip(desde).limit(limite)])

    res.status(200).json({total, desde, limite, animals})
}

const postAnimal = async (req, res) => {
    const {
        nombre,
        especie,
        expectativa_de_vida,
        peso,
        altura
    } = req.body

    const animal = new Animal({nombre, especie, peso, expectativa_de_vida, altura})

    animal.save();

    console.log({animal})

    res.status(200).json({msg: "Se ha creado exitosamente", animal});

}

const getAnimalById = async (req, res) => {
    const {id} = req.params;
    console.log({id})
    const animal = await Animal.findById(id);
    res.status(200).json(animal)
}

const putAnimalById = async (req, res) => {
    const {id} = req.params
    const {
        nombre,
        especie,
        expectativa_de_vida,
        peso,
        altura
    } = req.body;

    const animal = await Animal.findByIdAndUpdate(id, {nombre, especie, expectativa_de_vida, peso, altura});

    res.status(200).json({
        msg: "Se ha actualizado correctamente", animal
    })
}

const deleteAnimalById = async (req, res) => {
    const {id} = req.params;

    const animal = await Animal.findByIdAndUpdate(id, {tp_estado: false})

    res.status(200).json({
        msg: "Se ha eliminado correctamente", animal
    })
}

module.exports = {
    getAnimals,
    postAnimal,
    getAnimalById,
    putAnimalById,
    deleteAnimalById
}