const axios = require('axios')

async function test(url){
  const start = Date.now()
  try{
    await axios.get(url, {timeout:15000, maxContentLength:2000000})
    const duration = Date.now() - start
    // simple metric in ms
    return {ok:true, timeMs: duration}
  }catch(err){
    return {ok:false, error: err.message}
  }
}

module.exports = {test}
