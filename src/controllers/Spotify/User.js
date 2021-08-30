const { responses } = require('../../utils')
const User = require('../../vendors/Spotify/User')

exports.get = async (req,res) => {
    try{
        const accessToken = req.cookies["accessToken"]
        const resp = await User.get(accessToken)
        return res.json(
            responses.success(resp)
        )
    }catch(err){
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}