const { Spotify } = require("../../services")
const database = require('../../database')
const { responses } = require('../../utils')

exports.login = async (req, res) => {
    await Spotify.get("https://accounts.spotify.com/authorize", {
        params: {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: '34fFs29kd09'    //spotify recommended state
        }
    })
    return res.json(responses.success({}))
}

exports.authorized = async (req, res) => {
    const { code } = req.params
    if (code) await database.insert(code)
    return res.json(
        responses.success({})
    )
}