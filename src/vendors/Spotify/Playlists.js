const { Spotify } = require("../../services")
const utils = require("../../utils")

exports.get = async (accessToken,{page = 0, size = 20}) => {
    try{
        const playlistData = await Spotify.get(`/me/playlists?offset=${page}&limit=${size}`,{
            headers: {
                ...utils.spotify.getAuthorizationHeader(accessToken)
            }
        })
        return playlistData.data
    }catch(err){
        const message = err.response?.data || err.message || err
        throw new utils.Exception(message, err.response?.status)
    }
}