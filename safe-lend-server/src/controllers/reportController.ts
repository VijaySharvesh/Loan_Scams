import { Request, Response } from 'express';
import Report from '../models/Report';

// Create a new report
export const createReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all reports
export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update report
export const updateReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns updated document
      runValidators: true, // Ensures validation applies
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete report
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
