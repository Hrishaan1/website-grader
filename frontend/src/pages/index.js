import {useState} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home(){
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    if(!url) return setError('Enter a URL')
    setLoading(true)
    try{
      // Call local backend proxy endpoint which will forward to server
      const resp = await axios.get(`/api/analyze`, {params:{url}})
      // Redirect to report page with the result attached to sessionStorage
      sessionStorage.setItem('wg_report', JSON.stringify(resp.data))
      window.location.href = '/report'
    }catch(err){
      setError(err?.response?.data?.message || err.message)
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Website Grader</h1>
        <p className="mb-6 text-gray-600">Enter a URL to run a quick website audit (speed, mobile, content, SSL).</p>

        <form onSubmit={submit} className="flex gap-2">
          <input className="flex-1 p-3 border rounded" placeholder="https://example.com" value={url} onChange={e=>setUrl(e.target.value)} />
          <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading? 'Running...' : 'Analyze'}</button>
        </form>
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </main>
      <Footer />
    </div>
  )
}
