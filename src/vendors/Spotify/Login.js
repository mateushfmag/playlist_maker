const user = require("./User.js")
const url = require('url');
const axios = require("axios");
const utils = require('../../utils');

exports.login = async () => {
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

        const userData = await user.get(access_token)
        return userData
    } catch (err) {
        throw new Error(err.response?.data || err.message, err.response?.status)
    }
}


exports.refreshToken = async refreshToken => {
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
}