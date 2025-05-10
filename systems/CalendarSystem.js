const CalendarSystem = {
  schedule: [], // Each job will include: { job, startHour, endHour }

  workingHours: {
    start: 8, // 8 AM
    end: 17  // 5 PM
  },

  init() {
    this.schedule = [];
  },

  scheduleJob(job) {
    const duration = job.duration;
    const availableStart = this.findOpenSlot(duration);

    if (availableStart !== null) {
      this.schedule.push({
        job,
        startHour: availableStart,
        endHour: availableStart + duration
      });

      console.log(`Scheduled: ${job.customer}, ${job.vehicle}, ${job.issue}`);
      return true;
    }

    console.log("No time slot available.");
    return false;
  },

  findOpenSlot(duration) {
    const { start, end } = this.workingHours;

    for (let hour = start; hour <= end - duration; hour++) {
      const conflict = this.schedule.some(
        entry => !(hour + duration <= entry.startHour || hour >= entry.endHour)
      );

      if (!conflict) {
        return hour;
      }
    }

    return null;
  },

  getSchedule() {
    return this.schedule.map(entry => ({
      time: `${entry.startHour}:00–${entry.endHour}:00`,
      customer: entry.job.customer,
      vehicle: entry.job.vehicle,
      issue: entry.job.issue
    }));
  }
};

export default CalendarSystem;
