const { User, validateUser } = require('../models/User')
const bcrypt = require('bcrypt')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    const users = await User.find()
    return res.json(users)
  },

  async store(req, res) {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ validationError: error.details[0].message })

    const { nome, email, senha, telefones } = req.body

    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ duplicateError: 'Usuários já está cadastrado' })

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(senha, salt)

    user = await User.create({
      nome,
      email,
      senha: hash,
      telefones
    })

    return res.json(_.pick(user, ['_id', 'nome', 'email', 'telefones', 'token']))
  }
}