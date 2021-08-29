const { responses } = require('../../utils')
const Login = require('../../vendors/Spotify/Login')

exports.login = async (req, res) => {
    try{
        const resp = await Login.login()
        // return res.json(responses.success(resp.data))
        return res.send(resp.data)
    }catch(err){
        return res.status(err.status || 500).json(
            responses.error(err.message)
        )
    }
}

exports.authorize = async (req, res) => {
    try{
        const resp = await Login.authorize(req.params.code)
        return res.json(responses.success({
            data: resp
        }))
    }catch(err){
        return res.status(err.status).json(
            responses.error(err.message)
        )
    }
}