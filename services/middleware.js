

const validateBody = (schema) => (req, res, next) => {
  const body = Object.keys(req.body).length;
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  if (body === 0) return res.status(400).json({ message: "missing fields" });


  next();
};

const validateBodyUpdate = (schema) => (req, res, next) => {
    const body = Object.keys(req.body).length;
    const { error } = schema.validate(req.body);
  
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (body !== 3) return res.status(400).json({ message: "missing required name field" });
  
    next();
  };

module.exports = {validateBody,validateBodyUpdate}
