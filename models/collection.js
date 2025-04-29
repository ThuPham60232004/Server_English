import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    nameCollection: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },

});

const Collection = mongoose.model("Collection", CollectionSchema);
export default Collection;
