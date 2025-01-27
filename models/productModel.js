import { Schema, model,Types  } from "mongoose";

export const prodSchema= Schema({
    name: String,
    discraption: String,
    imageUrl: String,
    manufactureDate: { type: Date, default: new Date() },
    tags: [String],
    price: Number

})
export const prodModel= model("prod", prodSchema)
