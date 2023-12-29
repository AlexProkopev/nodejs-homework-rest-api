const app = require('./app')
const services = require('./services/services.js')

app.use(services.errorHandler);
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
