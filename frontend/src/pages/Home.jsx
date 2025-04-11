import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Student Job Tracker</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Track all your job applications in one place. Add new opportunities, manage your application statuses, and stay organized during your job hunt.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          ➕ Add Job
        </button>
        <button
          onClick={() => navigate('/view')}
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md shadow hover:bg-gray-300 transition"
        >
          📋 View Jobs
        </button>
      </div>
    </div>
  )
}
