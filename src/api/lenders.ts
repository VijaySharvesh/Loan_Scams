import { Request, Response } from 'express';
import Lender from '../models/Lender';
import Report from '../models/Report';
import connectDB from '../lib/mongodb';

export async function getVerifiedLenders(req: Request, res: Response) {
  try {
    await connectDB();
    const lenders = await Lender.find({ status: 'verified' });
    res.json(lenders);
  } catch (error) {
    console.error('Error fetching verified lenders:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getScamLenders(req: Request, res: Response) {
  try {
    await connectDB();
    const reports = await Report.find({ status: 'approved' })
      .sort({ reportCount: -1 })
      .limit(50);
    res.json(reports);
  } catch (error) {
    console.error('Error fetching scam reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function searchLenders(req: Request, res: Response) {
  try {
    await connectDB();
    const { query } = req.query;

    const [verified, scams] = await Promise.all([
      // Search verified lenders
      Lender.find({
        status: 'verified',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { rbi_number: { $regex: query, $options: 'i' } },
        ],
      }),
      // Search scam reports
      Report.find({
        status: 'approved',
        $or: [
          { lenderName: { $regex: query, $options: 'i' } },
          { website: { $regex: query, $options: 'i' } },
        ],
      }).sort({ reportCount: -1 }),
    ]);

    res.json({ verified, scams });
  } catch (error) {
    console.error('Error searching lenders:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function reportLender(req: Request, res: Response) {
  try {
    await connectDB();
    const {
      lenderName,
      website,
      contactInfo,
      incidentDate,
      description,
      evidenceUrls,
    } = req.body;

    const report = new Report({
      lenderName,
      website,
      contactInfo,
      incidentDate,
      description,
      evidenceUrls: evidenceUrls.split(',').map((url: string) => url.trim()),
      status: 'pending',
      createdAt: new Date(),
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Server error' });
  }
}