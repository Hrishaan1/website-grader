import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScoreCard from '../components/ScoreCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Report(){
  const [report, setReport] = useState(null)

  useEffect(()=>{
    const raw = sessionStorage.getItem('wg_report')
    if(raw) setReport(JSON.parse(raw))
  },[])

  if(!report) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Audit Report</h1>
        <p className="mb-6 text-gray-600">Scores and recommendations for: {report.url || '—'}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard title="Performance" score={report.scores?.performance ?? 'N/A'} details={report.recommendations?.performance ?? 'No recommendation'} />
          <ScoreCard title="Mobile" score={report.scores?.mobile ?? 'N/A'} details={report.recommendations?.mobile ?? 'No recommendation'} />
          <ScoreCard title="Content" score={report.scores?.content ?? 'N/A'} details={report.recommendations?.content ?? 'No recommendation'} />
          <ScoreCard title="SSL" score={report.scores?.ssl ?? 'N/A'} details={report.recommendations?.ssl ?? 'No recommendation'} />
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Raw data</h2>
          <pre className="text-xs text-gray-700 max-h-64 overflow-auto">{JSON.stringify(report, null, 2)}</pre>
        </div>
      </main>
      <Footer />
    </div>
  )
}
