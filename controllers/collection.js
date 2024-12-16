import Collection from "../models/collection.js";
export const newCollections= async(req,res,next)=>{
    const newCollection=new Collection(req.body);
    try{
        const savedCollection=await newCollection.save();
        res.status(200).json(savedCollection);
    }
    catch(err){
        next(err);
    }
};
export const updatedCollections= async(req,res,next)=>{
    try{
        const updatedCollection=await Collection.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedCollection);
    }
    catch(err){
        next(err);
    }
};
export const deletedCollections= async(req,res,next)=>{
    try{
        await Collection.findByIdAndDelete(req.params.id);
        res.status(200).json("Collection đã bị xoá");
    }
    catch(err){
        next(err);
    }
};
export const getCollectionById= async(req,res,next)=>{
    try{
        const collection=await Collection.findById(req.params.id);
        res.status(200).json(collection);
    }
    catch(err){
        next(err);
    }
}
export const getAllCollections= async(req,res,next)=>{
    try{
        const collections=await Collection.find();
        res.status(200).json(collections);
    }
    catch(err){
        next(err);
    }
}