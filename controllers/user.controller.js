const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGET = async (req, res) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosGetById = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.status(200).json({
        usuario
    });
}

const usuariosPost = async (req, res) => {
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    console.log({nombre, correo, password, role});

    res.status(202).json({
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: "Usuario actualizado correctamente",
        usuario
    });
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.status(200).json({
        msg: "Usuario eliminado correctamente",
        usuario
    });
}

module.exports = {
    usuariosPost,
    usuariosGET,
    usuariosGetById,
    usuariosPut,
    usuariosDelete
}