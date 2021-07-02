const { body, validationResult, check } = require('express-validator')
const mongoose = require('mongoose')
const User = require('../models/User.modal')
const validation = {
  validate: () => {
    return [
      body('name', 'Name is Required Field').not().isEmpty(),
      body('password', 'Password is Required Fiels').not().isEmpty(),
      check('email').not().isEmpty().isEmail().custom(val => {
        const query = User.find({ email: val })
        return query.exec().then(user => {
          if (user.length > 0) {
            return Promise.reject('E-mail already in use')
          }
        })
      })
    ]
  }
}
module.exports = validation.validate
