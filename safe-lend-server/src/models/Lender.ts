import mongoose from 'mongoose';

interface ILender extends mongoose.Document {
  name: string;
  rbi_number: string;
  image_url: string;
  approval_date: Date;
  status: 'pending' | 'verified' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

const LenderSchema = new mongoose.Schema<ILender>({
  name: { type: String, required: true, maxlength: 60 },
  rbi_number: { type: String, required: true, unique: true },
  image_url: { type: String, required: true },
  approval_date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

LenderSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const Lender = mongoose.models.Lender || mongoose.model<ILender>('Lender', LenderSchema);
export default Lender;
