import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Outdoor', 'Indoor', 'Cultural', 'Adventure', 'Relaxation'] },
    duration: { type: String },  // Por ejemplo: '2 horas', '1 día'
    price: { type: Number },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;