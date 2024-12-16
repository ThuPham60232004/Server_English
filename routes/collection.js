import express from "express";
import { 
    newCollections, 
    updatedCollections, 
    deletedCollections, 
    getCollectionById, 
    getAllCollections 
} from "../controllers/collection.js";

const router = express.Router();

router.post("/", newCollections);
router.put("/:id", updatedCollections);
router.delete("/:id", deletedCollections);
router.get("/:id", getCollectionById);
router.get("/", getAllCollections);

export default router;