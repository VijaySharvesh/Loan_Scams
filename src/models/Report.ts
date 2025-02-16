import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  lenderName: {
    type: String,
    required: [true, 'Please provide the lender name'],
    maxlength: [100, 'Lender name cannot be more than 100 characters'],
  },
  website: {
    type: String,
    maxlength: [200, 'Website URL cannot be more than 200 characters'],
  },
  contactInfo: {
    type: String,
    maxlength: [200, 'Contact information cannot be more than 200 characters'],
  },
  incidentDate: {
    type: Date,
    required: [true, 'Please provide the incident date'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description of the incident'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  evidenceUrls: [{
    type: String,
    maxlength: [500, 'Evidence URL cannot be more than 500 characters'],
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);