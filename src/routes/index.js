const { Router } = require('express')
const routes = Router()
const controllers = {
    spotify: {
        playlists: require("../controllers/Spotify/Playlists"),
        login: require("../controllers/Spotify/Login"),
    }
}

routes.get("/ping", (req,res) => res.send("pong"))
routes.get("/getPlaylists", (req,res) => controllers.spotify.playlists.get)
routes.get("/login", (req,res) => controllers.spotify.login.login)
routes.get("/authorized", (req,res) => controllers.spotify.login.authorized)

module.exports = routes