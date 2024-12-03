import formidable from "formidable";
import Place from "../models/Place.js";
import mongoose from 'mongoose';
import cloudinary from "../config/cloudinary.js";
import { v4 as uuid} from 'uuid';



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
        popularityScore,
    });

    if (!name || !description) {
        return res.status(400).json({ msg: 'Los campos name y description son obligatorios.' });
    }

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
        const place = await Place.findByIdAndUpdate(idPlace);
        
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


const uploadImages = async (req, res) => {
    const form = formidable({ 
        multiples: true 
    });

    try {
        // Parsear los archivos
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.status(400).json({ error: 'Error al procesar los archivos' });
            }

            // Verificar si es un array o un solo archivo
            const images = Array.isArray(files.file) ? files.file : [files.file];
            
            // max 5 images
            if (images.length > 5) {
                return res.status(400).json({ msg: 'Solo puedes subir un máximo de 5 imágenes' });
            }
            
            const imageUrls = [];

            // Crear un array de promesas para subir todas las imágenes
            const uploadPromises = images.map(file => {
                const filepath = file.filepath;
                return cloudinary.uploader.upload(filepath, {
                    public_id: uuid(),
                    folder: 'places', // Puedes cambiar el nombre de la carpeta
                });
            });

            // Esperar que todas las promesas se resuelvan
            const results = await Promise.all(uploadPromises);

            // Extraer las URLs de las imágenes subidas
            results.forEach(result => {
                imageUrls.push(result.secure_url);
            });

            // id del lugar from req.params
            const { idPlace } = req.params;
            console.log(idPlace);

            // Actualizar el lugar con las nuevas URLs de las imágenes
            const updatedPlace = await Place.findByIdAndUpdate(
                idPlace, // Buscar por el ID del lugar
                { $set: { images: imageUrls } }, // Actualizar las imágenes
                { new: true } // Retornar el lugar actualizado
            );

            if(!updatedPlace){
                return res.status(404).json({ msg: 'Lugar no encontrado' });
            }

            return res.status(200).json({
                msg: 'Imágenes subidas correctamente',
                imageUrls
            });          
        });
        
    } catch (e) {
        const error = new Error('Error al subir las imágenes');
        return res.status(400).json({ msg: error.message });
    }
}


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
    deletePlace,
    uploadImages,
}