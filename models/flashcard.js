import mongoose from "mongoose";

const FlashCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
},{ timestamps: true });

const FlashCard = mongoose.model("FlashCard", FlashCardSchema);
export default FlashCard;
