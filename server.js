// require("dotenv").config();
require("./services/db.js")
const app = require('./app')
app.listen(8080, () => {
  console.log("Server running. Use our API on port: 8080")
})
