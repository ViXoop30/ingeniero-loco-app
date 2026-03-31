import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompts = [
    { name: "hero-ai-core", prompt: "Futuristic AI neural network core, glowing blue and orange data streams, dark background, high-tech aesthetic, 4k, cinematic lighting, intricate circuitry." },
    { name: "pos-system", prompt: "Modern professional Point of Sale (POS) software interface on a tablet, sleek dark mode design, vibrant data charts, retail environment background, high-tech." },
    { name: "sales-page", prompt: "Modern high-converting sales landing page design, sleek typography, vibrant call-to-action buttons, tech-focused layout, dark mode aesthetic." },
    { name: "wp-bundle", prompt: "A bundle of premium WordPress themes and plugins, represented as glowing holographic boxes, high-tech development theme, dark background." }
  ];

  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  for (const item of prompts) {
    console.log(`Generating ${item.name}...`);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts: [{ text: item.prompt }] },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const filePath = path.join(publicDir, `${item.name}.png`);
        fs.writeFileSync(filePath, Buffer.from(part.inlineData.data, "base64"));
        console.log(`Saved ${item.name}.png`);
      }
    }
  }
}

generate().catch(console.error);
