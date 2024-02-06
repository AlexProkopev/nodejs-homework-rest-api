
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email().required(),
  phone:  Joi.string().min(10).max(15).required(),
});



const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email(),
  phone:  Joi.string().min(10).max(15),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {schema,schemaUpdate,schemaUpdateStatus }