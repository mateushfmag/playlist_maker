const { Router } = require('express')
const routes = Router()
const controllers = {
    spotify: {
        playlists: require("../controllers/Spotify/Playlists"),
        login: require("../controllers/Spotify/Login"),
        user: require("../controllers/Spotify/User")
    }
}

routes.get("/ping", (req,res) => res.send("pong"))
routes.get("/", (req,res) => res.send("pong"))
routes.get("/login", controllers.spotify.login.login)
routes.get("/authorize", controllers.spotify.login.authorize)
routes.get("/user", controllers.spotify.user.get)
routes.get("/playlists", controllers.spotify.playlists.get)
routes.post("/playlists", controllers.spotify.playlists.create)

module.exports = routes