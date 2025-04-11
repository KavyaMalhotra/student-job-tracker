const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getJobs = () => `${BASE_URL}/jobs`;
export const getJobById = (id) => `${BASE_URL}/jobs/${id}`;
export const postJob = () => `${BASE_URL}/jobs`;
export const patchJob = (id) => `${BASE_URL}/jobs/${id}`;
export const deleteJob = (id) => `${BASE_URL}/jobs/${id}`;