// Report storage utility - user-based report management

// Get reports for a specific user
export const getUserReports = (userId) => {
  if (!userId) return [];
  const key = `reports_${userId}`;
  const reports = localStorage.getItem(key);
  return reports ? JSON.parse(reports) : [];
};

// Save a report for a specific user
export const saveUserReport = (userId, report) => {
  if (!userId) return false;
  const key = `reports_${userId}`;
  const reports = getUserReports(userId);
  
  // Check if report with same ID exists (update) or create new
  const existingIndex = reports.findIndex(r => r.id === report.id);
  if (existingIndex >= 0) {
    reports[existingIndex] = report;
  } else {
    reports.push(report);
  }
  
  localStorage.setItem(key, JSON.stringify(reports));
  return true;
};

// Delete a report for a specific user
export const deleteUserReport = (userId, reportId) => {
  if (!userId) return false;
  const key = `reports_${userId}`;
  const reports = getUserReports(userId);
  const filteredReports = reports.filter(r => r.id !== reportId);
  localStorage.setItem(key, JSON.stringify(filteredReports));
  return true;
};

// Get a specific report by ID
export const getUserReport = (userId, reportId) => {
  if (!userId) return null;
  const reports = getUserReports(userId);
  return reports.find(r => r.id === reportId) || null;
};

