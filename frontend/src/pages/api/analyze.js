import axios from 'axios'

export default async function handler(req, res) {
  const {url} = req.query
  if(!url) return res.status(400).json({message:'url is required'})

  try{
    // Forward to backend server running on localhost:5000
    const resp = await axios.get('http://localhost:5001/analyze', {params:{url}})
    return res.status(200).json(resp.data)
  }catch(err){
    return res.status(500).json({message: err?.response?.data?.message || err.message})
  }
}
