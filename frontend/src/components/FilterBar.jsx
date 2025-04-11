import React from 'react';

export default function FilterBar() {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by company or role"
        className="px-3 py-2 border rounded-md w-full"
      />
      <select className="px-3 py-2 border rounded-md">
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}
