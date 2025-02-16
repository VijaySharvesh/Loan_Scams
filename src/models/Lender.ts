import mongoose from 'mongoose';

const LenderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the lender'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  rbi_number: {
    type: String,
    required: [true, 'Please provide an RBI number'],
    unique: true,
  },
  image_url: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  approval_date: {
    type: Date,
    required: [true, 'Please provide an approval date'],
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

LenderSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.models.Lender || mongoose.model('Lender', LenderSchema);