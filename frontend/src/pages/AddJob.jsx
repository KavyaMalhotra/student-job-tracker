// frontend/src/pages/AddJob.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { postJob } from '../api';

export default function AddJob() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // POST to backend
      const res = await axios.post(`${BASE_URL}/jobs`, formData);
      console.log('Job added:', res.data)

      // Navigate to view jobs page
      navigate('/view')
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.error ||
        'Failed to add job. Please try again.'
      )
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Job Application</h2>

      {error && (
        <div className="mb-4 text-red-600 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Name */}
        <div>
          <label className="block font-medium mb-1" htmlFor="company">Company Name</label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Google"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1" htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. SDE Intern"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1" htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1" htmlFor="date">Application Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Link */}
        <div>
          <label className="block font-medium mb-1" htmlFor="link">Job Link</label>
          <input
            type="url"
            name="link"
            id="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/job"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}
