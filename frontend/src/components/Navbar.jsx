import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">📘 Job Tracker</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add" className="hover:underline">Add Job</Link>
        <Link to="/view" className="hover:underline">View Jobs</Link>
      </div>
    </nav>
  )
}
