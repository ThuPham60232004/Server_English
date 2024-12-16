import mongoose from "mongoose"; 
import FlashCard from '../models/flashcard.js';
import Collection from '../models/collection.js';

export const createFlashcard = async (req, res, next) => {
    const { collectionid } = req.params;
    const newFlashcard = new FlashCard(req.body);

    try {
        if (!mongoose.Types.ObjectId.isValid(collectionid)) {
            return res.status(400).json({ message: "Invalid collection ID" });
        }

        const savedFlashcard = await newFlashcard.save();
        const updatedCollection = await Collection.findByIdAndUpdate(
            collectionid,
            { $push: { flashcards: savedFlashcard._id } },
            { new: true }
        );

        if (!updatedCollection) {
            return res.status(404).json({ message: "Collection not found." });
        }

        res.status(200).json({
            message: "Flashcard created and added to collection successfully.",
            updatedCollection,
        });
    } catch (err) {
        next(err);
    }
};
  
export const updateFlashcard = async (req, res, next) => {
    try {
        const updatedFlashcard = await FlashCard.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedFlashcard);
    } catch (err) {
        next(err);
    }
};
export const deleteFlashcard = async (req, res, next) => {
    try {
        const flashcardId = req.params.id;
        const deletedFlashcard = await FlashCard.findByIdAndDelete(flashcardId);
        if (!deletedFlashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }
        await Collection.updateMany(
            { flashcards: flashcardId },
            { $pull: { flashcards: flashcardId } } 
        );
        res.status(200).json({ message: "Flashcard and its references removed successfully" });
    } catch (err) {
        next(err);
    }
};

export const getFlashcardById = async (req, res, next) => {
    try {
        const flashcard = await FlashCard.findById(req.params.id);
        res.status(200).json(flashcard);
    } catch (err) {
        next(err);
    }
};
export const getFlashcard = async (req, res, next) => {
    try {
        const flashcards = await FlashCard.find();
        res.status(200).json(flashcards);
    } catch (err) {
        next(err);
    }
};
export const getFlashcardByCollectionId = async (req, res, next) => {
    const { collectionid } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(collectionid)) {
            return res.status(400).json({ message: "Invalid collection ID" });
        }

        const collection = await Collection.findById(collectionid).populate('flashcards');

        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        // Return the flashcards associated with the collection
        res.status(200).json(collection.flashcards);
    } catch (err) {
        next(err);
    }
};
