const Finances = {
  startingBudget: 10000,
  income: 0,
  expenses: 0,

  expenseLog: [],
  incomeLog: [],

  init() {
    this.income = 0;
    this.expenses = 0;
    this.expenseLog = [];
    this.incomeLog = [];
  },

  earn(description, amount) {
    this.income += amount;
    this.incomeLog.push({
      description,
      amount,
      date: new Date().toLocaleDateString()
    });
  },

  spend(description, amount) {
    this.expenses += amount;
    this.expenseLog.push({
      description,
      amount,
      date: new Date().toLocaleDateString()
    });
  },

  paySelf(amount) {
    this.spend("Owner Salary", amount);
  },

  get balance() {
    return this.startingBudget + this.income - this.expenses;
  },

  get profit() {
    return this.income - this.expenses;
  }
};

export default Finances;
