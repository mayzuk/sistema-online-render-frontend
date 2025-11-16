import React from 'react'

export default function AdminLayout({ title, children }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  )
}
