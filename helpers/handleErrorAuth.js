 
 const handleErroreAuth = (err, req, res, next) => {
    const {name,code} = err
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    console.log(status);
    err.status = status
    next();
 }

 module.exports = {handleErroreAuth}