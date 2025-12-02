import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="bg-white shadow">
			<div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3">
							<img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
							<span className="font-semibold">Website Grader</span>
						</Link>
				<div>
					  <Link href="/report" className="text-sm text-gray-600 hover:text-gray-900">Report</Link>
				</div>
			</div>
		</nav>
	)
}
