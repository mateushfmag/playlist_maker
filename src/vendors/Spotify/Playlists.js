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
        const message = utils.getAxiosMessage(err)
        throw new utils.Exception(message, err.response?.status)
    }
}

exports.create = async (accessToken, { userId, name }) => {
    try{
        await Spotify.post(`/users/${userId}/playlists`,{ name },{
            headers: {
                ...utils.spotify.getAuthorizationHeader(accessToken)
            }
        })
    }catch(err){
        const message = utils.getAxiosMessage(err)
        throw new utils.Exception(message, err.response?.status)
    }
}