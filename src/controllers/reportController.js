import { ReportModel } from "../models/reportModel.js";

export const ReportController = {
  async totalCustomers(req, res) {
    try {
      const total = await ReportModel.getTotalCustomers();
      res.json({ total_customers: total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};