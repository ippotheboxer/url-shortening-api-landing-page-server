import express, { Application, Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors());

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

// Endpoint to shorten URLs
app.post("/shorten", async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.body;
  
      if (!url) {
        res.status(400).json({ error: "URL is required" });
        return;
      }
  
      const response = await axios.post("https://cleanuri.com/api/v1/shorten", new URLSearchParams({ url }));
  
      res.json(response.data); 
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to shorten URL" });
    }
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
