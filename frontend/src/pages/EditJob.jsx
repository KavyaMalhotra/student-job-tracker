import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing job data
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await axios.get(`http://localhost:5000/jobs/${id}`);
        const { _id, ...jobData } = res.data; // 🔐 remove _id
        setFormData(jobData);
      } catch (err) {
        console.error(err);
        setError('Failed to load job data.');
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { _id, ...jobData } = formData; // 🛡️ ensure _id isn't sent
      await axios.patch(`http://localhost:5000/jobs/${id}`, jobData);
      navigate('/view');
    } catch (err) {
      console.error(err);
      setError('Failed to update job.');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading job...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Job Application</h2>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Link</label>
          <input
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}
