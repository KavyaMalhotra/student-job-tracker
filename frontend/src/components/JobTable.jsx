import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JobTable({ jobs }) {
  const navigate = useNavigate();

  const handleDelete = async (id, company) => {
    const confirm = window.confirm(`Delete job at ${company}?`);
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      window.location.reload(); // for now, easy way to refresh view
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete the job. Try again.');
    }
  };

  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Company</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Link</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">{job.role}</td>
              <td className="px-4 py-3">{job.company}</td>
              <td className="px-4 py-3">{job.date}</td>
              <td className="px-4 py-3 capitalize">{job.status}</td>
              <td className="px-4 py-3">
                {job.link ? (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => navigate(`/edit/${job._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                   Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id, job.company)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
