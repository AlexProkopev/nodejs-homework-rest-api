const Joi = require("joi");

const registSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
})

const schemaEmail = Joi.object({
    email: Joi.string().email().required(),
  })

const schemas= {
    registSchema,
    loginSchema,
    schemaEmail
}

module.exports = {schemas}