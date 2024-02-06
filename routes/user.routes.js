const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');

const {usuariosPost, usuariosGET, usuariosGetById, usuariosPut, usuariosDelete} = require('../controllers/user.controller');
const {emailExists, isRoleValid, userExistsById} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGET);

router.get("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(userExistsById),
    validarCampos
], usuariosGetById);

router.put("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(userExistsById),
    check("role").custom(isRoleValid),
    validarCampos
], usuariosPut);

router.delete("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(userExistsById),
], usuariosDelete);

router.post(
    "/",
    [
        check("nombre", "Nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min: 6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(emailExists),
        check("role").custom(isRoleValid),
        validarCampos,
    ], usuariosPost
)

module.exports = router;