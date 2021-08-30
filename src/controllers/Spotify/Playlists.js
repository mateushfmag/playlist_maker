const { responses } = require('../../utils')
const Playlists = require('../../vendors/Spotify/Playlists')
const PlaylistsValidator = require("../../validations/Spotify/Playlists")

exports.get = async (req, res) => {
    try {
        const accessToken = req.cookies["accessToken"]
        const { page, size } = req.query
        const resp = await Playlists.get(accessToken, { page, size })
        return res.json(
            responses.success(resp)
        )
    } catch (err) {
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}

exports.create = async (req, res) => {
    try {
        const accessToken = req.cookies["accessToken"]
        const playlistDefaultName = `generatedPlaylist_${new Date().getTime()}`
        const { userId, name = playlistDefaultName } = req.body
        const params = { userId, name }
        await PlaylistsValidator.create(params)
        const resp = await Playlists.create(accessToken, params)
        return res.json(
            responses.success(resp)
        )
    } catch (err) {
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}
