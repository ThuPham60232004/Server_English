import express from "express";
import { 
    createFlashcard, 
    updateFlashcard, 
    deleteFlashcard, 
    getFlashcardById, 
    getFlashcard,
    getFlashcardByCollectionId
} from "../controllers/flashcard.js";

const router = express.Router();

router.post("/:collectionid", createFlashcard);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);
router.get("/:id", getFlashcardById);
router.get("/", getFlashcard);
router.get('/collections/:collectionid/flashcards', getFlashcardByCollectionId);
export default router;
