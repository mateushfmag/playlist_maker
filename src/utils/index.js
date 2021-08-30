require("dotenv/config")
exports.responses = {
    success: function (data, others = {}) {
        return { data, ...others }
    },
    error: function (message, others = {}) {
        return { message, ...others }
    }
}

exports.spotify = {
    basicAuthorizationHeader: new function(){
        const clientId = process.env.SPOTIFY_CLIENT_ID
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
        return {
            'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        }
    },
    getAuthorizationHeader: accessToken => ({
        'Authorization': 'Bearer ' + accessToken
    })
}

exports.Exception = class extends Error{
    constructor(message,status = 500){
        super(message)
        this.status = status
    }
}