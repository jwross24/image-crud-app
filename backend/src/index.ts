import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const PORT = 4000;
const UPLOAD_DIR = "./uploads";
const app = express();
let id_counter = 0;

interface Image {
  id: number;
  name: string;
  url: string;
}

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const fileId = id_counter;
    const fileName = `${fileId}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

let images: Image[] = [];

if (fs.existsSync(UPLOAD_DIR)) {
  const files = fs.readdirSync(UPLOAD_DIR);
  images = files.map((file, index) => ({
    id: index,
    name: file,
    url: `http://localhost:${PORT}/uploads/${file}`,
  }));
  id_counter = files.length;
}

app.use(cors());

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  if (req.file) {
    images.push({
      id: id_counter,
      name: req.file.originalname,
      url: `http://localhost:${PORT}/uploads/${id_counter}-${req.file.originalname}`,
    });
    id_counter += 1;
    res.status(200).send();
  }
});

app.get("/images", (req: Request, res: Response) => {
  res.json(images);
});

app.delete("/image/:id", (req: Request, res: Response) => {
  const imageToDelete = images.find(
    (img) => img.id.toString() === req.params.id,
  );
  if (!imageToDelete) {
    res.status(404).send("Image ID not found.");
  } else {
    images = images.filter((img) => img.id.toString() !== req.params.id);
    fs.unlinkSync(path.join(UPLOAD_DIR, imageToDelete.name));
    res.status(200).send();
  }
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
