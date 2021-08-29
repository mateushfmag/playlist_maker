const { Spotify } = require("../../services")
const database = require('../../database')

exports.login = async () => {
    const state = '34fFs29kd09'    //spotify recommended state
    const scopes = ['playlist-read-private']
    const redirectUrl = `https://accounts.spotify.com/authorize?
        response_type=code&
        client_id=${process.env.SPOTIFY_CLIENT_ID}&
        scope=${scopes.join("%20")}&
        redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&
        state=${state}
    `.replace(/\n| /gm, '')
    return redirectUrl
}

exports.authorize = async (code) => {
    if (code) {
        const tokenResponse = await Spotify.post("/api/token", {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        })
        const { access_token } = tokenResponse.data
        const resp = await Spotify.get("/me", {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })

        return resp.data
    }
    return { success: 0 }
}