const urlLib = require('url')
const tls = require('tls')

async function check(rawUrl){
  try{
    const parsed = urlLib.parse(rawUrl)
    const host = parsed.hostname
    const port = 443

    if(parsed.protocol !== 'https:'){
      return {ok:false, secure:false, reason:'Not HTTPS'}
    }

    return await new Promise((resolve)=>{
      const socket = tls.connect(port, host, {servername: host, rejectUnauthorized:false, timeout:8000}, ()=>{
        const cert = socket.getPeerCertificate()
        if(!cert || Object.keys(cert).length===0){
          resolve({ok:false, secure:false, reason:'No cert'})
        }else{
          resolve({ok:true, secure:true, subject: cert.subject, valid_to: cert.valid_to})
        }
        socket.end()
      })
      socket.on('error', e=> resolve({ok:false, secure:false, reason: e.message}))
      socket.on('timeout', ()=> resolve({ok:false, secure:false, reason:'timeout'}))
    })
  }catch(err){
    return {ok:false, secure:false, error: err.message}
  }
}

module.exports = {check}
