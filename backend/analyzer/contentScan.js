const cheerio = require('cheerio')
const getHTML = require('../utils/getHTMl')

async function scan(url){
  try{
    const html = await getHTML(url)
    const $ = cheerio.load(html)

    // look for phone numbers
    const text = $('body').text()
    const phoneRegex = /\+?\d[\d\s\-()]{6,}/g
    const hasPhone = !!text.match(phoneRegex)

    // hours keyword
    const hasHours = /hours|open|opening hours/i.test(text)

    // CTA buttons (buttons or links with common CTAs)
    const ctaSelectors = 'a,button'
    const ctaTexts = ['contact','book','buy','get started','sign up','subscribe','order']
    let hasCTA = false
    $(ctaSelectors).each((i, el)=>{
      const t = $(el).text().trim().toLowerCase()
      if(ctaTexts.some(k=>t.includes(k))){ hasCTA = true }
    })

    return {ok:true, hasPhone, hasHours, hasCTA}
  }catch(err){
    return {ok:false, error: err.message}
  }
}

module.exports = {scan}
