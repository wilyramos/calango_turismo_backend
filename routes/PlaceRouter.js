import express from 'express';

import { createPlace, getPlaces, getPlaceById, updatePlace, deletePlace } from '../controllers/placeController.js';

import { createReview, getReviews, updateReview, deleteReview} from '../controllers/reviewController.js';

import verifyAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// router.route('/')
//     .post(verifyAuth, createPlace)
//     .get(verifyAuth, getPlaces);

router.post('/', verifyAuth, createPlace);
router.get('/', getPlaces);

// router.route('/:id')
//     .get(verifyAuth, getPlaceById)
//     .put(verifyAuth, updatePlace)
//     .delete(verifyAuth, deletePlace);

router.get('/:idPlace', getPlaceById);
router.put('/:idPlace',verifyAuth, updatePlace);
router.delete('/:idPlace', verifyAuth, deletePlace);

// reviews

// Create a review
router.post('/:idPlace/review', verifyAuth, createReview);

// Get all reviews for a specific item
router.get('/:idPlace/reviews', getReviews);

// Update a review
router.put('/:idPlace/review/:idReview', verifyAuth, updateReview);

// Delete a review
router.delete('/:idPlace/review/:idReview', verifyAuth, deleteReview);


export default router;