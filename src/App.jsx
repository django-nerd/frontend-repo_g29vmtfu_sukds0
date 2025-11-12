import { useState } from 'react'
import Background from './components/Background'

function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [referrer, setReferrer] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    if (!email) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined, referrer: referrer || undefined, notes: notes || undefined })
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Unable to join the waitlist right now.')
      }

      const data = await res.json()
      setStatus({ type: 'success', message: data.message || "You're on the list! We'll be in touch soon." })
      setEmail('')
      setName('')
      setReferrer('')
      setNotes('')
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Background />

      <header className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-indigo-600 text-white grid place-items-center font-bold">r</div>
          <span className="font-semibold text-xl text-slate-800 tracking-tight">re:collect</span>
        </div>
        <div className="text-sm text-slate-500">Second brain for your relationships</div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-6 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 backdrop-blur px-3 py-1 text-xs text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Private beta
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold leading-tight text-slate-900">
            Remember people, not tabs.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            re:collect is your relationship OS — a quiet, always-on assistant that captures context,
            resurfaces the right details, and helps you show up thoughtfully for the people who matter.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex items-start gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-xs">✓</span> Automatic context capture across meetings and notes</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-xs">✓</span> Smart reminders to reach out when it matters</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-xs">✓</span> A searchable second brain for your network</li>
          </ul>
        </section>

        <section>
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-xl shadow-indigo-100/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Join the waitlist</h2>
            <p className="mt-2 text-slate-600 text-sm">Get early access and product updates.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Name <span className="text-slate-400 font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">How did you hear about re:collect? <span className="text-slate-400 font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                  placeholder="Twitter, friend, newsletter..."
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything you'd like us to know?"
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {status && (
                <div className={`${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'} border rounded-lg px-3 py-2 text-sm`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
              >
                {loading ? 'Joining…' : 'Join waitlist'}
              </button>
              <p className="text-xs text-slate-500 text-center">We respect your inbox. Unsubscribe anytime.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-10 text-sm text-slate-500">
        <div className="border-t border-slate-200/70 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} re:collect</span>
          <span className="text-slate-400">Crafted for thoughtful connectors</span>
        </div>
      </footer>
    </div>
  )
}

export default App
