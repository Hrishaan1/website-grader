const express = require('express')
const analyzer = require('./analyzer')
const { default: puppeteer } = require('puppeteer')
const app = express()
const port = process.env.PORT || 5001
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

app.get('/analyze', async (req, res) => {
  const {url} = req.query
  if(!url) return res.status(400).json({message:'url query param required'})

  try{
    const result = await analyzer.runAll(url)
    res.json(result)
  }catch(err){
    console.error(err)
    res.status(500).json({message: err.message || 'analysis failed'})
  }
})

app.listen(port, ()=>{
  console.log(`Backend server running on http://localhost:${port}`)
})
