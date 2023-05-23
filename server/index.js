import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import register from "./controllers/auth.js";

/* MIDDLEWARE / CONFIGIRATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets "))); //to serve static files
mongoose.set("strictQuery", false);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, filename, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, filename, cb) {
    cb(null, filename.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES */
app.post("/auth/register", upload.single("picture"), register);


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on " + PORT);
    });
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
