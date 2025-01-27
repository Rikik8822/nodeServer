import { connect } from "mongoose";
export const connectToDb = async (req, res) => {
    try {
        let con = await connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000})
        console.log("mongo db connected")
    }
    catch (err) {
        console.log("cannot connect mongoDB ", err)
        process.exit(1)
    }
}