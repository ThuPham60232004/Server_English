import mongoose from "mongoose"; 
import FlashCard from '../models/flashcard.js';
import Collection from '../models/collection.js';

 export const createFlashcard =async(req,res,next)=>{
    const newFlashcard=new FlashCard(req.body);
    try{
        const savedFlashcard=await newFlashcard.save();
        res.status(200).json(savedFlashcard);
    }
    catch(err){
        next(err);
    }
 } 
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
    try {
        const collectionId = req.params.id;
        const flashcards = await FlashCard.find({ collection: collectionId });
        res.status(200).json(flashcards);
      } catch (error) {
        console.error("Error fetching flashcards by collection:", error);
        res.status(500).json({ message: "Lỗi server khi lấy flashcard" });
      }
};
