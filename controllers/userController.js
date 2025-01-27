// import { userModel } from "../models/userModel.js";

// export async function getAllUsers(req, res) {
//     try {
//         let result = await userModel.find();
//         res.json(result)
//     } catch (err) {
//         res.status(400).json({ title: "לא הצליח להביא את כל המשתמשים ", message: err.message })
//     }

// }
// export async function getUserById(req, res) {
//     let { id } = req.params;
//     try {
//         let result = await userModel.findById(id);
//         if (!result)
//             return res.status(404).json({ title: "cannot get by id", message: "no user with such id" })
//         res.json(result)
//     }
//     catch (err) {
//         res.status(400).json({ title: "לא הצלחיח להביא  משתמש לפי קוד ", message: err.message })
//     }

// }

// export async function addUser_signUp(req, res) {

//     let { body } = req;
//     if (!body.username || !body.password || !body.phone || !body.email)
//         return res.status(404).json({ title: "missing data in body", message: "username password email phone are required" })
//     try {
//         let alreadyUser = await userModel.findOne({ username: body.username })
//         if (alreadyUser)
//             return res.status(409).json({ title: "username already exists", message: "change user name" })

//         let newU = new userModel(req.body);
//         await newU.save();
//         res.json(newU)


//     }
//     catch (err) {
//         res.status(400).json({ title: "לא הצלחיח להוסיף משתמש", message: err.message })
//     }

// }
// export async function updateUser(req, res) {
//     let { id } = req.params;
//     if (body.username || body.password)
//         return res.status(404).json({ title: "cannot update these details in body", message: "username password cannot be changed here" })
//     try {

//         let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
//         if (!result)
//             return res.status(404).json({ title: "cannot update by id", message: "no user with such id" })
//         res.json(result)
//     }
//     catch (err) {
//         res.status(400).json({ title: "לא הצלחיח לעדכן  משתמש לפי קוד ", message: err.message })
//     }

// }
// export async function getUseByUsernamePassword_login(req, res) {
//     let { username, password } = req.body;

//     if (!username || !password)
//         return res.status(404).json({ title: "missing data in body", message: "username password  are required" })
//     try {
//         let result = await userModel.findOne({ username: username });
//         if (!result)
//             return res.status(404).json({ title: "cannot login", message: "no user with such username" })
//         if (result.password != password)
//             return res.status(404).json({ title: "cannot login", message: "wrong password" })
//         res.json(result)
//     }
//     catch (err) {
//         res.status(400).json({ title: "לא הצלחיח להביא  משתמש עם פרטים אלה ", message: err.message })
//     }

// }
// export async function updateFine(req, res) {
//     let id = req.params.id;
//     let sum = req.body.sum;
//     try {
//         let result = await userModel.findByIdAndUpdate(id, { $set: { fine: 0 } }, { new: true });
//         if (!result)
//             return res.status(404).json({ title: "cannot pay fima", message: "no user with such username" })

//         res.json(result)
//     }
//     catch (err) {
//         res.status(400).json({ title: "error in paying fine", message: err.message })
//     }

// }
// export const updatePassword = async (req, res) => {
//     const { id } = req.params;
//     const { oldPassword, newPassword } = req.body;
//     const user = await User.findById(id);
  
//     if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
  
//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();
//     res.json({ message: "Password updated successfully" });
//   };
  
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

// שליפת כל המשתמשים (ללא סיסמא)
export async function getAllUsers(req, res) {
    try {
        const result = await userModel.find().select("-password");
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to fetch users", message: err.message });
    }
}

// שליפת משתמש לפי מזהה (ללא סיסמא)
export async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const result = await userModel.findById(id).select("-password");
        if (!result) {
            return res.status(404).json({ title: "User not found", message: "No user with such ID" });
        }
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to fetch user", message: err.message });
    }
}

// הוספת משתמש חדש
export async function addUser_signUp(req, res) {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ title: "Missing data in body", message: "username, password, and email are required" });
    }
    try {
        const alreadyUser = await userModel.findOne({ username });
        if (alreadyUser) {
            return res.status(409).json({ title: "Username already exists", message: "Choose a different username" });
        }

        // הצפנת סיסמא
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            username: newUser.username, 
            email: newUser.email, 
            role: newUser.role, 
            _id: newUser._id 
        });
    } catch (err) {
        res.status(400).json({ title: "Failed to add user", message: err.message });
    }
}

// עדכון פרטי משתמש (ללא סיסמא וללא שם משתמש)
export async function updateUser(req, res) {
    const { id } = req.params;
    const { username, password, ...updates } = req.body;

    if (username || password) {
        return res.status(400).json({ title: "Invalid update", message: "username and password cannot be updated here" });
    }

    try {
        const result = await userModel.findByIdAndUpdate(id, updates, { new: true });
        if (!result) {
            return res.status(404).json({ title: "User not found", message: "No user with such ID" });
        }
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to update user", message: err.message });
    }
}

// כניסה (שליפת משתמש לפי שם משתמש וסיסמא)
export async function getUseByUsernamePassword_login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ title: "Missing data in body", message: "username and password are required" });
    }

    try {
        const user = await userModel.findOne({ username }).select("+password");
        if (!user) {
            return res.status(404).json({ title: "Cannot login", message: "No user with such username" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ title: "Cannot login", message: "Incorrect password" });
        }

        res.json({ 
            username: user.username, 
            email: user.email, 
            role: user.role, 
            _id: user._id 
        });
    } catch (err) {
        res.status(400).json({ title: "Failed to login", message: err.message });
    }
}

// עדכון סיסמא
export async function updatePassword(req, res) {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ title: "Missing data in body", message: "oldPassword and newPassword are required" });
    }

    try {
        const user = await userModel.findById(id).select("+password");
        if (!user) {
            return res.status(404).json({ title: "User not found", message: "No user with such ID" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ title: "Cannot update password", message: "Old password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(400).json({ title: "Failed to update password", message: err.message });
    }
}
