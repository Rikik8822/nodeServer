import{Schema,Types,model}from "mongoose";
const miniProductSchema=Schema({
    prodName:String,
    price: Number,
    cnt:Number
})
const orderSchema=Schema({
    date:{type:Date,default: new Date()},
    targetDate:Date,
    address:String,
    userId:{type:Types.ObjectId},
    products:[miniProductSchema],
    isGoOut:{type:Boolean, default:false},
    priceOfSending:{type:Number, default:40},
    finalPrice:Number
})
export const orderModel=model("Order",orderSchema);
