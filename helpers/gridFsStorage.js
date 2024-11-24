import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

let gfs;

mongoose.connection.once("open", () => {
    gfs = new GridFSBucket(mongoose.connection.db, {
        bucketName: "images", // Nombre del bucket para las imágenes
    });
});

export const uploadImage = async (file, filename) => {
    if (!gfs) throw new Error("GridFS is not initialized");

    const uploadStream = gfs.openUploadStream(filename);
    uploadStream.end(file.buffer);
    return filename;
};

export const getImageStream = (filename) => {
    if (!gfs) throw new Error("GridFS is not initialized");

    return gfs.openDownloadStreamByName(filename);
};

export const deleteImage = async (filename) => {
    if (!gfs) throw new Error("GridFS is not initialized");

    const file = await gfs.find({ filename }).toArray();
    if (file.length > 0) {
        await gfs.delete(file[0]._id);
    }
};
