  
const express = require("express")
const app = express()
const cors = require("cors")
const routes = require("./routes")
const cookieParser = require("cookie-parser");
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(routes)
module.exports = app