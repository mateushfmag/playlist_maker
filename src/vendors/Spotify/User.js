const { Spotify } = require("../../services")
const utils = require("../../utils")

exports.get = async accessToken => {
    const user = await Spotify.get(`/me`, {
        headers: {
            ...utils.spotify.getAuthorizationHeader(accessToken)
        }
    })
    return user.data
}