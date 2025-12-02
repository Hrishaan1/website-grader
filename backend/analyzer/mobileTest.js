const puppeteer = require('puppeteer')

// Use headless Chrom(ium) to check viewport issues like horizontal scroll and viewport meta
async function test(url){
  let browser
  try{
    browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await browser.newPage()
    await page.setViewport({width:375, height:812}) // iPhone X size
    await page.goto(url, {waitUntil:'networkidle2', timeout:20000})

    // check for viewport meta
    const hasViewport = await page.$eval('head', head => !!head.querySelector('meta[name="viewport"]'))

    // check for horizontal overflow
    const overflow = await page.evaluate(()=>{
      const html = document.documentElement
      return html.scrollWidth > window.innerWidth
    })

    return {ok:true, viewportMeta: !!hasViewport, horizontalOverflow: !!overflow}
  }catch(err){
    return {ok:false, error: err.message}
  }finally{
    if(browser) await browser.close()
  }
}

module.exports = {test}
