const { Spotify } = require("../../services")
const database = require('../../database')

exports.login = async () => {
    const spotifyResponse = await Spotify.get("https://accounts.spotify.com/authorize", {
        params: {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: '34fFs29kd09'    //spotify recommended state
        }
    })
    return spotifyResponse
}

exports.authorize = async (code) => {
    if (code) {
        await database.insert(code)
        return { success: 1 }
    }
    return { success: 0 }
}