function quickSortJobs(jobs) {
    if (jobs.length <= 1) return jobs;
  
    const pivot = jobs[0];
    const pivotDate = new Date(pivot.appliedDate);
  
    const left = [];
    const right = [];
  
    for (let i = 1; i < jobs.length; i++) {
      const currentDate = new Date(jobs[i].appliedDate);
  
      // We want latest first, so "greater" date goes to left
      if (currentDate > pivotDate) {
        left.push(jobs[i]);
      } else {
        right.push(jobs[i]);
      }
    }
  
    return [...quickSortJobs(left), pivot, ...quickSortJobs(right)];
  }

  const jobs = [
    { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01" },
    { company: "Amazon", role: "Backend Intern", appliedDate: "2025-04-05" },
    { company: "Meta", role: "Frontend Intern", appliedDate: "2025-03-28" }
  ];
  
  const sortedJobs = quickSortJobs(jobs);
  console.log(sortedJobs);