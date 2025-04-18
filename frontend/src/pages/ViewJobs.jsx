import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getJobs } from '../api';
import JobCard from '../components/JobCard';
import JobTable from '../components/JobTable';
import FilterBar from '../components/FilterBar';

export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get(getJobs());
        setJobs(res.data);
        setFilteredJobs(res.data); // initially show all
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleSearch = (query, status) => {
    const lowerQuery = query.toLowerCase();
    const filtered = jobs.filter((job) => {
      const matchesQuery =
        job.company.toLowerCase().includes(lowerQuery) ||
        job.role.toLowerCase().includes(lowerQuery);
      const matchesStatus = status ? job.status === status : true;
      return matchesQuery && matchesStatus;
    });

    setFilteredJobs(filtered);
  };

  if (loading) return <div className="text-center mt-8">Loading jobs...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">📋 All Job Applications</h2>
      <FilterBar onSearch={handleSearch} />

      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-600 mt-4">No job applications found.</div>
      ) : (
        <>
          {/* 👇 Mobile View - Cards */}
          <div className="sm:hidden grid grid-cols-1 gap-4 mt-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* 👇 Desktop View - Table */}
          <div className="hidden sm:block mt-6">
            <JobTable jobs={filteredJobs} />
          </div>
        </>
      )}
    </div>
  );
}
