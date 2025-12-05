import React, { createContext, useState, useEffect } from "react";

const PaginationContext = createContext({
  currentPage: 1,
  jobsPerPage: 9,
  totalPages: 0,
  goToPrevPage: () => {},
  goToNextPage: () => {},
  goToPage: (page) => {},
  currentJobs: [],
});

const PaginationProvider = ({ jobs, children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const calculateJobsRange = (currentPage, jobsPerPage, jobs) => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return jobs.slice(indexOfFirstJob, indexOfLastJob);
  };

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 if jobs data changes
  }, [jobs]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    scrollToTop();
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const value = {
    currentPage,
    jobsPerPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    goToPage,
    currentJobs: calculateJobsRange(currentPage, jobsPerPage, jobs),
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export { PaginationContext, PaginationProvider };
