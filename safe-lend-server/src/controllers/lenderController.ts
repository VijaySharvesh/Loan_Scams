import { Request, Response } from 'express';
import Lender from '../models/Lender';

// Create a new lender
export const createLender = async (req: Request, res: Response) => {
  try {
    const lender = await Lender.create(req.body);
    res.status(201).json(lender);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all lenders
export const getLenders = async (_req: Request, res: Response) => {
  try {
    const lenders = await Lender.find();
    res.json(lenders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update lender
export const updateLender = async (req: Request, res: Response) => {
  try {
    const lender = await Lender.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lender) {
      return res.status(404).json({ message: 'Lender not found' });
    }

    res.json(lender);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete lender
export const deleteLender = async (req: Request, res: Response) => {
  try {
    const lender = await Lender.findByIdAndDelete(req.params.id);

    if (!lender) {
      return res.status(404).json({ message: 'Lender not found' });
    }

    res.json({ message: 'Lender deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
