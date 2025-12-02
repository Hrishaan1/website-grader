export default function ScoreCard({title, score, details}) {
  const color = score >= 90 ? 'bg-green-100' : score >= 75 ? 'bg-yellow-100' : 'bg-red-100'
  return (
    <div className={`p-4 rounded shadow-sm ${color}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-lg font-bold">{score}</div>
      </div>
      {details && <p className="mt-2 text-sm text-gray-700">{details}</p>}
    </div>
  )
}
