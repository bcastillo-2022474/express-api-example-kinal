const Role = require('../models/role')
const Usuario = require('../models/usuario')

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne
        ({ role })
    if (!roleExists) {
        throw new Error(`The role ${role} is not registered in the database`)
    }
    return true
}

const emailExists = async (email = '') => {
    const emailExist = await Usuario.findOne({email})
    if (emailExist) {
        throw new Error(`The email ${email} is already registered`)
    }
    return false
}

const userExistsById = async (id) => {
    const user = await Usuario
        .findById(id)
    if (!user) {
        throw new Error(`The id ${id} does not exist`)
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
}