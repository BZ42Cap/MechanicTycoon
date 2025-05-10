import Finances from "../business/Finances.js";
import TimeSystem from "./TimeSystem.js";

const ExpenseSystem = {
  expenses: [
    { label: "Shop Rent", amount: 200 },
    { label: "Utilities", amount: 75 },
    { label: "Insurance", amount: 50 }
  ],

  init() {
    // Hook into end-of-day event
    TimeSystem.onDayEnd = () => {
      this.applyDailyExpenses();
    };
  },

  applyDailyExpenses() {
    console.log("Applying daily expenses...");
    this.expenses.forEach(exp => {
      Finances.spend(exp.label, exp.amount);
    });
  }
};

export default ExpenseSystem;
