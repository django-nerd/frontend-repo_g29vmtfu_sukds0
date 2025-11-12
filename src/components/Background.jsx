import React from 'react'

// Decorative, animated background for modern, sleek feel.
// Uses Tailwind utilities defined in index.css for motion.
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated gradient field */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Soft grid for depth */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Floating blobs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-400/40 blob blob-1" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-pink-400/30 blob blob-2" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-emerald-400/30 blob blob-3" />

      {/* Vignette mask to focus center content */}
      <div className="absolute inset-0 vignette" />
    </div>
  )
}
