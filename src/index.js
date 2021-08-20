  
const app = require('./app')
require("dotenv").config()
const PORT = process.env.PORT || 3000
const {format} = require("date-fns")
app.listen(PORT,() => {
    const date = new Date()
    console.log(`[${format(date,"dd/MM/yyyy hh:mm:ss")}] app running on port ${PORT}`)
})