import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    location: {
        address: String,
        coordinates: {
            lat: Number,
            lon: Number
        }
    },
    category: { 
        type: String, 
        enum: ['Nature', 'Culture', 'Recreational', 'Historical', 'Urban'] 
    }, 
    priceRange: { 
        type: String, 
        enum: ['Free', 'Low', 'Medium', 'High'] 
    },
    rating: { type: Number, 
        default: 0 
    },
    reviews: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' 
        }
    ],
    images: [String],
    activities: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Activity' 
    }],
    popularityScore: { 
        type: Number, 
        default: 0 
    }
});

const Place = mongoose.model('Place', placeSchema);
export default Place;
