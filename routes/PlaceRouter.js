import express from 'express';
import isAdmin from '../middleware/isAdmin.js';

// Controllers for Places and Reviews
import { 
  createPlace, 
  getPlaces, 
  getPlaceById, 
  updatePlace, 
  deletePlace, 
  uploadImages 
} from '../controllers/placeController.js';

import { 
  createReview, 
  getReviews, 
  updateReview, 
  deleteReview
} from '../controllers/reviewController.js';

// Middleware for authentication
import verifyAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for managing Places

// Create a new place (requires authentication)
router.post('/', verifyAuth, isAdmin, createPlace);

// Get all places (public)
router.get('/', getPlaces);

// Get a specific place by ID (public)
router.get('/:idPlace', getPlaceById);

// Update a place (requires authentication)
router.put('/:idPlace', verifyAuth, isAdmin, updatePlace);

// Delete a place (requires authentication)
router.delete('/:idPlace', verifyAuth, isAdmin, deletePlace);

// Upload images for a specific place (requires authentication)
router.post('/:idPlace/images', verifyAuth, isAdmin, uploadImages);




// Routes for managing Reviews

// Create a review for a specific place (requires authentication)
router.post('/:idPlace/review', verifyAuth, createReview);

// Get all reviews for a specific place (public)
router.get('/:idPlace/reviews', getReviews);

// Update a specific review (requires authentication)
router.put('/:idPlace/review/:idReview', verifyAuth, updateReview);

// Delete a specific review (requires authentication)
router.delete('/:idPlace/review/:idReview', verifyAuth, deleteReview);

export default router;
