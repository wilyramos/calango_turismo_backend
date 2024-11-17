import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    recommendedPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
    algorithmUsed: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);