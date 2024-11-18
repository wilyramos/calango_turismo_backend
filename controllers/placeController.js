import Place from "../models/Place.js";
import mongoose from 'mongoose';

const createPlace = async (req, res) => {
    const {  name, description, location, category, priceRange, rating, reviews, imageUrls, activities, popularityScore } = req.body;

    const place = new Place({
        name,
        description,
        location,
        category,
        priceRange,
        rating,
        reviews,
        imageUrls,
        activities,
        popularityScore
    });

    try {
        const newPlace = await place.save();
        res.status(201).json(newPlace);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
}

const getPlaces = async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
}

const getPlaceById = async (req, res) => {
    const { idPlace } = req.params;
    try{
        const place = await Place.findById(idPlace);
        if(!place){
            return res.status(404).json({ msg: 'Lugar no encontrado' });
        }
        res.json(place);
    }
    catch(error){
        res.status(400).send({ msg: error.message });
    }
};

const updatePlace = async (req, res) => {
    const { idPlace } = req.params;

    // Verifica si el id tiene un formato válido de ObjectId
    if (!mongoose.Types.ObjectId.isValid(idPlace)) {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }

    try {
        const place = await Place.findById(idPlace);
        
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }

        // Actualiza solo los campos recibidos en la solicitud
        place.name = req.body.name || place.name;
        place.description = req.body.description || place.description;
        place.location = req.body.location || place.location;
        place.category = req.body.category || place.category;
        place.priceRange = req.body.priceRange || place.priceRange;
        place.rating = req.body.rating || place.rating;
        place.reviews = req.body.reviews || place.reviews;
        place.imageUrls = req.body.imageUrls || place.imageUrls;
        place.activities = req.body.activities || place.activities;
        place.popularityScore = req.body.popularityScore || place.popularityScore;

        // Guarda los cambios
        const updatedPlace = await place.save();
        res.json(updatedPlace);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};


const deletePlace = async (req, res) => {
    const { idPlace } = req.params;

    // Verifica si el id tiene un formato válido de ObjectId
    if (!mongoose.Types.ObjectId.isValid(idPlace)) {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }

    try {
        const place = await Place.findById(idPlace);

        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }

        await place.deleteOne();
        res.json({ msg: "Lugar eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', msg: error.message });
    }
};

export {
    createPlace,
    getPlaces,
    getPlaceById,
    updatePlace,
    deletePlace
}