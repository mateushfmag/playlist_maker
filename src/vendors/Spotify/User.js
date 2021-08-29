const { Spotify } = require("../../services")
const utils = require("../../utils")

exports.get = async accessToken => {
    const playlists = await Spotify.get(`/me`, {
        headers: {
            ...utils.spotify.getAuthorizationHeader(accessToken)
        }
    })
    return playlists.data
}