import mongoose from "mongoose";

//42 DATOS RECIBIDOS INCLUYENDO EL USER_ID

const BusinessSchema = new mongoose.Schema({
  fantasyName: { type: String, required: true, maxlength: 250 },
  category: { type: String, required: true, maxlength: 250 },
  subcategory: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: false, maxlength: 2500, default: '' },
  
  paymentMethods: {
    efectivo: { type: Boolean, required: true },
    transferencia: { type: Boolean, required: true },
    credito: { type: Boolean, required: true },
    debito: { type: Boolean, required: true },
    criptomonedas: { type: Boolean, required: true },
  },
  
  general: {
    bilingual: { type: Boolean, required: true },
    onlineBooking: { type: Boolean, required: true },
    cancelation: { type: Boolean, required: true },
    attention: { type: Boolean, required: true },
    emergency: { type: Boolean, required: true },
    aids: { type: Boolean, required: true },
    events: { type: Boolean, required: true },
    cspaces: { type: Boolean, required: true },
    estprivate: { type: Boolean, required: true },
  },
  
  accessibility: {
    rampas: { type: Boolean, required: true },
    abath: { type: Boolean, required: true },
    assistance: { type: Boolean, required: true },
  },
  
  gastronomy: {
    cmenu: { type: Boolean, required: true },
    vegetarian: { type: Boolean, required: true },
    infant: { type: Boolean, required: true },
    delivery: { type: Boolean, required: true },
    takeaway: { type: Boolean, required: true },
    wine: { type: Boolean, required: true },
    beer: { type: Boolean, required: true },
    live: { type: Boolean, required: true },
    ambient: { type: Boolean, required: true },
    braile: { type: Boolean, required: true },
  },
  
  connectivity: {
    freewifi: { type: Boolean, required: true },
    fastcharge: { type: Boolean, required: true },
    coworkspace: { type: Boolean, required: true },
  },
  
  additional: {
    petfriendly: { type: Boolean, required: true },
    recycling: { type: Boolean, required: true },
  },
  
  schedule: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
  },
  
  phone: { type: String, required: true },
  web: { type: String, default: null },
  instagram: { type: String, default: null },
  coverPhoto: { type: String, default: null },
  gallery: [{ type: String }],
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', BusinessSchema);
export default Business;
