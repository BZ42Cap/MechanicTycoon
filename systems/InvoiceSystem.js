import Finances from "../business/Finances.js";

const InvoiceSystem = {
  invoices: [],

  init() {
    this.invoices = [];
  },

  createInvoice({ customer, vehicle, labor, parts }) {
    const partsTotal = parts.reduce((sum, p) => sum + p.cost, 0);
    const total = labor + partsTotal;

    const invoice = {
      id: this.invoices.length + 1,
      date: new Date().toLocaleDateString(),
      customer,
      vehicle,
      labor,
      parts,
      total
    };

    this.invoices.push(invoice);
    Finances.earn(`Invoice #${invoice.id} - ${customer}`, total);
    console.log("Invoice Created:", invoice);

    return invoice;
  },

  getAllInvoices() {
    return this.invoices;
  }
};

export default InvoiceSystem;
