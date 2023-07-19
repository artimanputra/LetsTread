import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/final2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(`Database connection unsuccessful: ${e}`));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  telegram: String,
  phone: String,
  date: String,
  city: String,
  state: String,
  pincode: String,
  referredBy: String,
  Myrefer: String,
  profileImage: String,
});

const User = mongoose.model("User", userSchema);

const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, "vhfkhknkln");
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message,
    });
};

function generateReferralCode(name, city) {
  const nameWords = name.slice(0, 2);
  const cityCode = city.slice(0, 2);
  const randomNumber = Math.floor(Math.random() * 90 + 10);
  const referralCode = nameWords + cityCode + randomNumber;
  return referralCode;
}

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Max file size: 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

// Check file type for file upload
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.post("/reg", upload, async (req, res) => {
    const { name, email, password, phone, city, telegram, state, pincode, refer } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send("User already exists");
    }

    const encriptedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date().toString();

    let referralCode = refer;
    let referredBy = null;

    if (referralCode) {
        const referredByUser = await User.findOne({ referral: referralCode });

        if (!referredByUser) {
            return res.send("Invalid referral code");
        }

        referredBy = referredByUser._id;
    }

    const user = new User({
        name,
        email,
        password: encriptedPassword,
        phone,
        city,
        telegram,
        date: currentDate,
        state,
        pincode,
        referredBy: generateReferralCode(name, city),
        refer: refer,
        profileImage: req.file ? req.file.filename : "",
    });

    await user.save();
    sendCookie(user, res, `Welcome, ${user.name}`, 201);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound) {
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (passwordMatch) {
      res.send({ message: "Login successful", user: userFound });
      // sendCookie(userFound, res, `Welcome back, ${userFound.name}`, 200);
    } else {
      res.send({ message: "Incorrect password" });
    }
  } else {
    res.send({ message: "User not found" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out successfully" });
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
