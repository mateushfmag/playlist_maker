const axios = require("axios")

const spotifyBaseUrl = 'https://api.spotify.com/v1'

const Spotify = axios.create({
    baseURL: spotifyBaseUrl,
    timeout: 1000,
});

exports.Spotify = Spotify
exports.spotifyBaseUrl = spotifyBaseUrl