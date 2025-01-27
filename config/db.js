import { connect } from "mongoose";
mongoose.set('useFindAndModify', false);  // מניעת שימוש ב-findAndModify

export const connectToDb = async (req, res) => {
    try {
        let con = await connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // זמן הקצוב לחיבור
            connectTimeoutMS: 30000, // זמן לחיבור עצמו
            socketTimeoutMS: 30000 // זמן לשאילתות
        });

        console.log("MongoDB connected");
    }
    catch (err) {
        console.log("Cannot connect to MongoDB: ", err);
        process.exit(1); // אם החיבור נכשל, סיים את הפעולה
    }
}
