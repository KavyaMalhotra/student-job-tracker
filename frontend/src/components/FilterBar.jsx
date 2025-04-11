import React, { useState } from 'react';

export default function FilterBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    onSearch(query.trim(), status);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
      <input
        type="text"
        placeholder="Search by company or role"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border rounded-md w-full sm:w-auto"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border rounded-md w-full sm:w-auto"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
      >
        🔍 Search
      </button>
    </div>
  );
}
