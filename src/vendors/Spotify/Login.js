const url = require('url');
const axios = require("axios");
const utils = require('../../utils');

exports.login = async () => {
    try{
        const state = '34fFs29kd09'    //spotify recommended state
        const scopes = ['user-read-private']
        const redirectUrl = `https://accounts.spotify.com/authorize?` +
            new url.URLSearchParams({
                response_type: "code",
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scopes.join(" "),
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state
            })
        return redirectUrl
    }catch(err){
        throw new utils.Exception(err.message || err, 500)
    }
}

exports.authorize = async code => {
    try {
        const params = new url.URLSearchParams({
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
        });
        const tokenResult = await axios.post(`https://accounts.spotify.com/api/token`, params.toString(), {
            headers: {
                ...utils.spotify.basicAuthorizationHeader
            }
        })
        const { access_token } = tokenResult.data
        return access_token
    } catch (err) {
        const message = err.response?.data || err.message || err
        throw new utils.Exception(message, err.response?.status)
    }
}


exports.refreshToken = async refreshToken => {
    try{
        const params = new url.URLSearchParams({
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        });
        const tokenResult = await axios.post(`https://accounts.spotify.com/api/token`, params.toString(), {
            headers: {
                ...utils.spotify.basicAuthorizationHeader
            }
        })
        const { access_token } = tokenResult.data
        return access_token
    }catch(err){
        const message = err.response?.data || err.message || err
        throw new utils.Exception(message, err.response?.status)
    }
}