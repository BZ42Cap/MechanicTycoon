// Ensure this script is running by logging a test message
console.log("JavaScript is running!");

// Example functions to dynamically load job board and scheduled jobs
function loadJobBoard() {
    console.log("Loading job board...");
    const jobList = document.getElementById('job-list');
    const jobs = [
        { vehicle: 'Toyota Camry 2005', issue: 'Engine Misfire', time: '2 hours', payment: '$200' },
        { vehicle: 'Ford F-150 2010', issue: 'Brakes Squealing', time: '1.5 hours', payment: '$150' },
        { vehicle: 'Honda Accord 2018', issue: 'Overheating Engine', time: '3 hours', payment: '$250' },
    ];

    jobs.forEach(job => {
        const jobItem = document.createElement('li');
        jobItem.innerHTML = `
            <h3>${job.vehicle}</h3>
            <p>Issue: ${job.issue}</p>
            <p>Estimated Time: ${job.time}</p>
            <p>Payment: ${job.payment}</p>
            <button class="take-job">Take Job</button>
        `;
        jobList.appendChild(jobItem);
    });
}

// Function to display scheduled jobs
function loadScheduledJobs() {
    const scheduledJobsContainer = document.getElementById('scheduled-jobs');
    const scheduledJobs = [
        { vehicle: 'Toyota Camry 2005', time: '10:00 AM - 12:00 PM' },
    ];

    scheduledJobs.forEach(scheduledJob => {
        const scheduledItem = document.createElement('li');
        scheduledItem.innerHTML = `
            <h3>${scheduledJob.vehicle}</h3>
            <p>Scheduled: ${scheduledJob.time}</p>
        `;
        scheduledJobsContainer.appendChild(scheduledItem);
    });
}

// Initialize the game by loading job board and scheduled jobs
window.onload = function() {
    loadJobBoard();
    loadScheduledJobs();
};
