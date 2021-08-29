const { responses } = require('../../utils')
const Login = require('../../vendors/Spotify/Login')

exports.login = async (req, res) => {
    try{
        const resp = await Login.login()
        return res.redirect(resp)
    }catch(err){
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}

exports.authorize = async (req, res) => {
    try{
        const resp = await Login.authorize(req.query.code)
        return res.send(resp)
    }catch(err){
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}