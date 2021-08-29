const utils = require('../../utils')
const Login = require('../../vendors/Spotify/Login')

exports.login = async (req, res) => {
    try{
        const resp = await Login.login()
        return res.redirect(resp)
    }catch(err){
        return res.status(err.status || 500).json(
            utils.responses.error(err.message)
        )
    }
}

exports.authorize = async (req, res) => {
    try{
        const accessToken = await Login.authorize(req.query.code)
        res.cookie("accessToken",accessToken,{ httpOnly: true })
        return res.redirect("/user")
    }catch(err){
        return res.status(err.status || 500).json(
            utils.responses.error(err.message)
        )
    }
}