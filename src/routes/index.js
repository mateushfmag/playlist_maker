const { Router } = require('express')
const routes = Router()
const controllers = {
    spotify: {
        playlists: require("../controllers/Spotify/Playlists"),
        login: require("../controllers/Spotify/Login"),
    }
}

routes.get("/ping", (req,res) => res.send("pong"))
routes.get("/", (req,res) => res.send("pong"))
routes.get("/login", controllers.spotify.login.login)
routes.get("/authorize", controllers.spotify.login.authorize)

module.exports = routes