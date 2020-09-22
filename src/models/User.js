const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  nome: String,
  email: {
    type: String,
    patterm: '/.*@.*/'
  },
  senha: String,
  telefones: [{
    numero: String,
    ddd: {
      type: Number
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: function () {
      return JWT.sign(
        {
          nome: this.nome,
          email: this.email,
          telefones: this.telefones
        }, process.env.JWT_SECRET)
    }
  }
})


function validateUser(user) {
  const schema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().required().regex(/.*@.*/),
    senha: Joi.string().required().min(8),
    telefones: Joi.array().items({
      numero: Joi.string().length(9).pattern(/^[0-9]+$/).required(),
      ddd: Joi.string().length(2).pattern(/^[0-9]+$/)
    }).min(1).required()
  })

  return schema.validate(user)
}

userSchema.pre('save', next => {
  this.updatedAt = Date.now()
  return next()
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
  validateUser
}