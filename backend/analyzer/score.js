// Simple weighting: performance 40%, mobile 30%, content 20%, ssl 10%
function gradeFromPercent(p){
  if(p >= 90) return 'A'
  if(p >= 80) return 'B'
  if(p >= 70) return 'C'
  if(p >= 60) return 'D'
  return 'F'
}

function calculate({speed, mobile, content, ssl}){
  // performance score from speed
  let perfScore = 0
  if(speed && speed.ok){
    // map time in ms to score: <=200ms -> 100, 2000ms -> 50, >5000 -> 10
    const t = speed.timeMs || 5000
    if(t <= 200) perfScore = 100
    else if(t <= 2000) perfScore = Math.round(100 - (t-200)/(2000-200)*50)
    else if(t <= 5000) perfScore = Math.round(50 - (t-2000)/(5000-2000)*40)
    else perfScore = 10
  }

  // mobile
  let mobileScore = 0
  if(mobile && mobile.ok){
    mobileScore = 100 - (mobile.horizontalOverflow ? 30 : 0) - (mobile.viewportMeta ? 0 : 20)
  }

  // content
  let contentScore = 0
  if(content && content.ok){
    contentScore = 50
    if(content.hasPhone) contentScore += 20
    if(content.hasHours) contentScore += 15
    if(content.hasCTA) contentScore += 15
    if(contentScore > 100) contentScore = 100
  }

  // ssl
  let sslScore = 0
  if(ssl && ssl.ok && ssl.secure) sslScore = 100
  else sslScore = 0

  // weighted
  const total = Math.round(perfScore*0.4 + mobileScore*0.3 + contentScore*0.2 + sslScore*0.1)

  const scores = {
    performance: perfScore,
    mobile: mobileScore,
    content: contentScore,
    ssl: sslScore,
    total: total
  }

  const recommendations = {
    performance: perfScore < 80 ? 'Consider optimizing images, enabling caching, and reducing JS' : 'Good',
    mobile: mobileScore < 80 ? 'Add viewport meta and fix horizontal scroll issues' : 'Good',
    content: contentScore < 70 ? 'Add clear CTAs, phone number, and business hours on the page' : 'Good',
    ssl: sslScore < 50 ? 'Use HTTPS with a valid certificate' : 'Good'
  }

  return {scores, grade: gradeFromPercent(total), recommendations}
}

module.exports = {calculate}
