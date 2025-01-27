import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true }, // אימייל (שדה חובה)
  username: { type: String, required: true }, // שם משתמש (שדה חובה)
  password: { type: String, required: true }, // סיסמה (שדה חובה)
  role: { 
    type: String, 
    enum: ["user", "admin"], // ערכים מותרים בלבד
    default: "user", // ערך ברירת מחדל
  },
});

export const userModel = model("user", userSchema);
