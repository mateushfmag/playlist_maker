const { Spotify, spotifyBaseUrl } = require("../../services")
const database = require('../../database')
const axios = require("axios")

exports.login = async () => {
    const state = '34fFs29kd09'    //spotify recommended state
    const scopes = ['playlist-read-private']
    const redirectUrl = `https://accounts.spotify.com/authorize?
        response_type=code&
        client_id=${process.env.SPOTIFY_CLIENT_ID}&
        scope=${scopes.join("%20")}&
        redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&
        state=${state}
    `.replace(/\n| /gm, '')
    return redirectUrl
}

exports.authorize = async (code) => {
    try {
        if (code) {
            console.log(code, "ANTES DO TOKEN RESPONSE")
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const tokenResult = await axios.post(`https://accounts.spotify.com/api/token`, {
                code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                grant_type: 'authorization_code'
            }, {
                headers: {
                    'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
                }
            })

            const { access_token } = tokenResult.data

            const page = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <button id="list">Listar Playlists</button>
            <input id="token" value="${access_token}">
        </body>
        <script type="text/javascript">
            var btnList = document.getElementById("list")
            btnList.addEventListener("click",async ev => {
                try{
                    const base = ${spotifyBaseUrl}
                    const resp = await fetch(\`\${base}/me\`).then(resp => resp.json())
                    console.log(resp)
                }catch(err){
                    console.log("DEU ERRO", err.message)
                    console.error(err)
                }
            })
        </script>
        </html>`

            return page
        }
        return { success: 0 }
    } catch (err) {
        return err.response?.data || err.message
    }
}