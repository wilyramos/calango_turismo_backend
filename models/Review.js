import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    place: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Place', 
        required: true 
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
