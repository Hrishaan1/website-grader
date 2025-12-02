const fetchSpeed = require('./fetchSpeed')
const mobileTest = require('./mobileTest')
const contentScan = require('./contentScan')
const sslCheck = require('./sslCheck')
const score = require('./score')

async function runAll(url){
  // Run fast tests in parallel where possible
  const [speed, content, ssl] = await Promise.all([
    fetchSpeed.test(url),
    contentScan.scan(url),
    sslCheck.check(url),
  ])

  // Run mobile test (puppeteer) which may be slower
  const mobile = await mobileTest.test(url)

  const scores = score.calculate({speed, content, ssl, mobile})

  return {
    url,
    raw: {speed, content, ssl, mobile},
    scores: scores.scores,
    recommendations: scores.recommendations,
    generatedAt: new Date().toISOString()
  }
}

module.exports = {runAll}
