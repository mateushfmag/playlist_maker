const { Spotify } = require("../../services")
const utils = require("../../utils")

exports.get = async accessToken => {
    try{
        const user = await Spotify.get(`/me`, {
            headers: {
                ...utils.spotify.getAuthorizationHeader(accessToken)
            }
        })
        return user.data
    }catch(err){
        const message = utils.getAxiosMessage(err)
        throw new utils.Exception(message, err.response?.status)
    }
}