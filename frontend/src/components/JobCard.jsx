import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm(`Delete job at ${job.company}?`);
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/jobs/${job._id}`);
      window.location.reload(); // or use state refetching if you prefer
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete the job. Try again.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
      <h3 className="text-lg font-bold">{job.role}</h3>
      <p className="text-gray-700">🏢 {job.company}</p>
      <p className="text-sm text-gray-500">📆 {job.date}</p>
      <p className="mt-2">
        <span className="font-semibold">Status:</span> {job.status}
      </p>
      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-2 inline-block"
        >
          🔗 View Posting
        </a>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/edit/${job._id}`)}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded"
        >
           Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded"
        >
           Delete
        </button>
      </div>
    </div>
  );
}
