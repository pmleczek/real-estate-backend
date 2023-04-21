import express from "express";
import multer from "multer";
import path from "path";

import db from "../database/db.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "/usr/app/images",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${req.params.id}_${Date.now()}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage }).array("image", 10);
import auth from "../middleware/auth.js";

router.get("/:id", async (req, res) => {
    const listing = await db.collection("listings").findOne({ listingId: req.params.id });
    if (listing && listing.filenames.length > 0) {
        const images = [];
        for (const filename of listing.filenames) {
            const imagePath = path.join("/usr/app/images", filename);
            const exists = await fs.exists(imagePath);
            if (exists) {
                const image = await fs.readFile(imagePath);
                images.push(image);
            }
        }
        if (images.length > 0) {
            return res.status(200).send(images);
        }
    }
    return res.status(404).send({ message: "No images found" });
});

router.post("/:id", auth, async (req, res) => {
    const listing = await db.collection("listings").findOne({ listingId: req.params.id });
    if (listing && listing.userId === req.user) {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).send({ message: "Error uploading images" });
            } else {
                const images = req.files.map(file => file.filename);
                await req.db.collection("list").updateOne({ listingId: req.params.id }, { $push: { filenames: { $each: images } } });
                return res.status(200).send({ message: "Uploaded successfully" });
            }
        });
    } else if (listing == null) {
        const response = await fetch(`http://listing-service/api/v1/listing/info/${req.params.id}`);
        const data = await response.json();
        if (req.user === data.userId) {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(500).send({ message: "Error uploading images" });
                } else {
                    const images = req.files.map(file => file.filename);
                    await req.db.collection("list").insertOne({
                        listingId: req.params.id,
                        userId: data.userId,
                        filenames: images,
                    });
                    return res.status(200).send({ message: "Uploaded successfully" });
                }
            });
        }
    }
    return res.status(500).send({ message: "Error uploading images" });
});

export default router;
