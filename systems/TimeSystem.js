const TimeSystem = {
  hour: 8,
  minute: 0,
  dayIndex: 0, // 0 = Monday
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  timeSpeed: 1, // 1 real second = 1 game minute
  tickInterval: null,
  onNewHour: null,
  onDayEnd: null,

  init() {
    this.hour = 8;
    this.minute = 0;
    this.dayIndex = 0;

    if (this.tickInterval) clearInterval(this.tickInterval);
    this.tickInterval = setInterval(this.tick.bind(this), 1000);
  },

  tick() {
    this.minute += 1;

    if (this.minute >= 60) {
      this.minute = 0;
      this.hour += 1;
      if (this.onNewHour) this.onNewHour(this.hour);

      if (this.hour === 17) {
        if (this.onDayEnd) this.onDayEnd(this.getDay(), this.getTime());
        this.advanceDay();
      }
    }
  },

  advanceDay() {
    this.hour = 8;
    this.minute = 0;
    this.dayIndex = (this.dayIndex + 1) % 7;
  },

  getTime() {
    const h = this.hour.toString().padStart(2, "0");
    const m = this.minute.toString().padStart(2, "0");
    return `${h}:${m}`;
  },

  getDay() {
    return this.days[this.dayIndex];
  },

  getDayTimeLabel() {
    return `${this.getDay()} ${this.getTime()}`;
  }
};

export default TimeSystem;
