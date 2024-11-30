import mongoose from "mongoose";
const BusinessSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: { type: String, required: true },
  paymentMethods: {
    efectivo: { type:String,enum:['Sí', 'No'] },
    transferencia:{ type:String,enum:['Sí', 'No'] },
    credito:{ type:String,enum:['Sí', 'No'] },
    debito:{ type:String,enum:['Sí', 'No'] },
  },
  accessibility: { type: String, enum: ['Sí', 'No'], required: true },
  wifi: { type: String, enum: ['Sí', 'No'], required: true },
  acceptsPets: { type: String, enum: ['Sí', 'No'], required: true },
  parking: { type: String, enum: ['Sí', 'No'], required: true },
  schedule: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
  },
  phone: { type: String, required: true },
  web: { type: String },
  instagram: { type: String },
  coverPhoto: { type: String },
  gallery: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Business', BusinessSchema);