import { CustomerModel } from "../models/customerModel.js";

function validateCustomer(body) {
  const { email, phone } = body;
  if (email && !email.includes("@")) {
    return "Format email tidak valid";
  }
  if (phone && phone.length < 10) {
    return "Nomor telepon minimal 10 karakter";
  }
  return null;
}

export const CustomerController = {
  async getAll(req, res) {
    try {
      const { name, page, limit } = req.query;
      const result = await CustomerModel.getAll({ name, page, limit });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const errorMsg = validateCustomer(req.body);
      if (errorMsg) return res.status(400).json({ error: errorMsg });

      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const errorMsg = validateCustomer(req.body);
      if (errorMsg) return res.status(400).json({ error: errorMsg });

      const customer = await CustomerModel.update(req.params.id, req.body);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};