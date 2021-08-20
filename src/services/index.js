const axios = require("axios")

const Spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 1000,
});

exports.Spotify = Spotify