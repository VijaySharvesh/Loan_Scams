import mongoose from 'mongoose';

interface IReport extends mongoose.Document {
  lenderName: string;
  website?: string;
  contactInfo?: string;
  incidentDate: Date;
  description: string;
  evidenceUrls: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const ReportSchema = new mongoose.Schema<IReport>({
  lenderName: { type: String, required: true, maxlength: 100 },
  website: { type: String, maxlength: 200 },
  contactInfo: { type: String, maxlength: 200 },
  incidentDate: { type: Date, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  evidenceUrls: [{ type: String, maxlength: 500 }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
export default Report;
