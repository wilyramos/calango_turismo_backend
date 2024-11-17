import Place from "../models/Place.js";
import Review from "../models/Review.js";

import mongoose from 'mongoose';

const createReview = async (req, res) => {

    const { idPlace } = req.params;
    const { rating, comment } = req.body;

    try{
        const isValidId = mongoose.Types.ObjectId.isValid(idPlace);
        if (!isValidId) {
            return res.status(400).json({ message: "Invalid place id" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid place id" });
    }

    const place = await Place.findById(idPlace);
    
    if (!place) {
        return res.status(404).json({ message: "Place not found" });
    }

    const review = new Review({
        user: req.usuario._id, // from authMiddleware
        place: idPlace,
        rating,
        comment
    });

    try{
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getReviews = async (req, res) => {

    const { idPlace } = req.params;

    try{
        const isValidId = mongoose.Types.ObjectId.isValid(idPlace);
        if (!isValidId) {
            return res.status(400).json({ message: "Invalid place id" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid place id" });
    }

    const reviews = await Review.find({ place: idPlace });

    if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found" });
    }

    res.json(reviews);
    
}

const updateReview = async (req, res) => {

    const { idPlace, idReview } = req.params;
    const { rating, comment } = req.body;

    try{
        const isValidIdPlace = mongoose.Types.ObjectId.isValid(idPlace);
        const isValidIdReview = mongoose.Types.ObjectId.isValid(idReview);
        if (!isValidIdPlace || !isValidIdReview) {
            return res.status(400).json({ message: "Invalid place or review id" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid place or review id" });
    }

    const place = await Place.findById(idPlace);
    const review = await Review.findById(idReview);

    if (!place) {
        return res.status(404).json({ message: "Place not found" });
    }

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    } // verify that the user is the owner of the review

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    try{
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }   
}

const deleteReview = async (req, res) => {
    
    const { idPlace, idReview } = req.params;

    try{
        const isValidIdPlace = mongoose.Types.ObjectId.isValid(idPlace);
        const isValidIdReview = mongoose.Types.ObjectId.isValid(idReview);
        if (!isValidIdPlace || !isValidIdReview) {
            return res.status(400).json({ message: "Invalid place or review id" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid place or review id" });
    }

    const place = await Place.findById(idPlace);
    const review = await Review.findById(idReview);

    if (!place) {
        return res.status(404).json({ message: "Place not found" });
    }

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    } // verify that the user is the owner of the review

    try{
        await review.deleteOne();
        res.json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export {
    createReview, getReviews, updateReview, deleteReview
}