const axios = require('axios')

async function getHTML(url){
  const resp = await axios.get(url, {timeout:15000, headers:{'User-Agent':'WebsiteGrader/1.0'}})
  return resp.data
}

module.exports = getHTML
