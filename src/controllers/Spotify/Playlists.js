const { responses } = require('../../utils')
const Playlists = require('../../vendors/Spotify/Playlists')

exports.get = async (req,res) => {
    try{
        const accessToken = req.cookies["accessToken"]
        const {page, size} = req.query
        const resp = await Playlists.get(accessToken, {page, size})
        return res.json(
            responses.success(resp)
        )
    }catch(err){
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}