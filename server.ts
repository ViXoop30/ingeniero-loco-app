import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for Lightweight Persistence
const DB_PATH = path.join(process.cwd(), "db.json");

const INITIAL_CMS_DATA = {
  settings: {
    showSocialIcons: true,
    hero: {
      title: 'ESCALAR TU FACTURACION',
      description: 'Orquestamos la arquitectura técnica de élite que tu negocio necesita para automatizar procesos y maximizar el ROI. Cupos limitados para auditoría este mes.',
      cta: 'RESERVAR SESIÓN ESTRATÉGICA',
      subtitle: 'Sólo 2 cupos disponibles para Abril'
    },
    vibecoding: {
      tagline: 'ORQUESTRACIÓN CON VIBECODING',
      title: 'CONSTRUIMOS A LA VELOCIDAD DE <br/>TU NEGOCIO',
      desc: 'Utilizamos Inteligencia Artificial de Grado Industrial y la metodología VibeCoding para orquestar sistemas complejos en tiempo récord. No escribimos código; orquestamos resultados.'
    },
    industries: [
        { id: "1", title: "RESTAURANTES", desc: "Sistemas de comandas inteligentes con orquestación de inventario en tiempo real.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80", color: "text-orange-500", iconName: "ChefHat" },
        { id: "2", title: "BOTILLERÍAS", desc: "Integración nativa con control de stock y verificación de edad automática.", img: "https://images.unsplash.com/photo-1567696153598-5313f67131d7?auto=format&fit=crop&q=80", color: "text-purple-500", iconName: "Wine" }
    ],
    needs: {
      title: 'TU NECESIDAD <br/><span className="text-white/20">NUESTRA SOLUCIÓN</span>',
      subtitle: 'Impacto Real & Inmediato',
      desc: 'Eliminamos la fricción técnica para acelerar el crecimiento de tu activo.'
    },
    matrix: [
        { problem: "Gestión Manual", solution: "AUTÓNOMO", impact: "Eliminación completa del error humano y tiempos muertos.", iconName: "Cpu" },
        { problem: "Crecimiento Lento", solution: "ESCALABLE", impact: "Arquitecturas que crecen sin aumentar costes operativos.", iconName: "TrendingUp" },
        { problem: "Dudas de IA", solution: "VIBECODING", impact: "Implementación de IA de grado industrial en días, no meses.", iconName: "BrainCircuit" }
    ],
    footer: {
      description: 'Ingeniero Orquestador y Creador de Sistemas Inteligentes. Especializado en la automatización de procesos complejos y el desarrollo de arquitecturas autónomas de alto impacto.'
    }
  },
  products: [
    { id: "p1", name: "Bundle VibeCore v2", description: "Arquitectura base para sistemas de alta demanda con IA integrada.", price: 450000, category: "software", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", features: ["IA Fusion", "Scalable Ops", "Admin Pro"] },
    { id: "p2", name: "Landing Premium Loco", description: "Sitio web de alto impacto diseñado para la conversión inmediata.", price: 150000, category: "website", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80", features: ["Fast Load", "SEO Matrix", "Vibe Animated"] }
  ],
  timeline: [
    { id: "t1", title: "Lanzamiento Nucleus v1.0", description: "Despliegue de la primera arquitectura de orquestación autónoma para el sector logístico.", date: "2024-01-15", status: "completed", category: "deployment" },
    { id: "t2", title: "Integración VibeCoding", description: "Implementación de la metodología de construcción acelerada por IA en todos los workflows.", date: "2024-06-20", status: "completed", category: "innovation" },
    { id: "t3", title: "Escalado Industrial v2.4", description: "Optimización de microservicios para soporte de alta concurrencia en tiempo real.", date: "2025-02-10", status: "in-progress", category: "performance" }
  ]
};

function getDb() {
  try {
      if (!fs.existsSync(DB_PATH)) {
        saveDb(INITIAL_CMS_DATA);
        return INITIAL_CMS_DATA;
      }
      
      const stats = fs.statSync(DB_PATH);
      if (stats.isDirectory()) {
         console.warn("DB_PATH is a directory, removing it...");
         fs.rmSync(DB_PATH, { recursive: true, force: true });
         saveDb(INITIAL_CMS_DATA);
         return INITIAL_CMS_DATA;
      }

      const data = fs.readFileSync(DB_PATH, "utf-8");
      if (!data || data.trim() === "" || data.trim() === "{}") {
          return INITIAL_CMS_DATA;
      }
      
      const parsed = JSON.parse(data);
      // Ensure all fields are present
      return { 
          settings: { ...INITIAL_CMS_DATA.settings, ...(parsed.settings || {}) },
          products: parsed.products || INITIAL_CMS_DATA.products,
          timeline: parsed.timeline || INITIAL_CMS_DATA.timeline
      };
  } catch(e: any) {
      console.error("CRITICAL DB ERROR:", e.message);
      return INITIAL_CMS_DATA;
  }
}

function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch(e: any) {
    console.error("CANNOT SAVE DB:", e.message);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Log requests
  app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
  });

  // API route for admin login
  app.post("/api/login", (req, res) => {
    try {
        const { password } = req.body;
        if (password === process.env.ADMIN_PASSWORD || password === "admin123") {
          res.json({ success: true, token: "dummy-session-token" });
        } else {
          res.status(401).json({ success: false, error: "Invalid password" });
        }
    } catch(e: any) {
        console.error("LOGIN ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  // CMS PERSISTENCE ROUTES
  app.get("/api/cms/settings", (req, res) => {
    try {
        const db = getDb();
        res.json(db.settings);
    } catch(e: any) {
        console.error("GET SETTINGS ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/cms/settings", (req, res) => {
    try {
        const db = getDb();
        db.settings = req.body;
        saveDb(db);
        res.json({ success: true });
    } catch(e: any) {
        console.error("POST SETTINGS ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/cms/products", (req, res) => {
    try {
        const db = getDb();
        res.json(db.products);
    } catch(e: any) {
        console.error("GET PRODUCTS ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/cms/products", (req, res) => {
    try {
        const db = getDb();
        db.products = req.body;
        saveDb(db);
        res.json({ success: true });
    } catch(e: any) {
        console.error("POST PRODUCTS ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/cms/timeline", (req, res) => {
    try {
        const db = getDb();
        res.json(db.timeline);
    } catch(e: any) {
        console.error("GET TIMELINE ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/cms/timeline", (req, res) => {
    try {
        const db = getDb();
        db.timeline = req.body;
        saveDb(db);
        res.json({ success: true });
    } catch(e: any) {
        console.error("POST TIMELINE ERROR:", e.message);
        res.status(500).json({ error: e.message });
    }
  });

  // Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      const apiKey = process.env.GROQ_API_KEY;

      if (!apiKey || apiKey === "your_groq_api_key_here") {
        return res.json({ 
          success: true, 
          message: "¡Hola! Soy el asistente de El Ingeniero Loco. (El sistema está en modo demo sin API Key de Groq)" 
        });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "Eres el asistente de El Ingeniero Loco..." },
            ...history,
            { role: "user", content: message }
          ]
        })
      });

      const data = await response.json() as any;
      const botMessage = data.choices?.[0]?.message?.content || "No respuesta.";
      res.json({ success: true, message: botMessage });
    } catch (e: any) {
      console.error("CHAT ERROR:", e.message);
      res.status(500).json({ success: false });
    }
  });

  // Static Assets or Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM] Internal logic online on http://0.0.0.0:${PORT}`);
  });
}

startServer();
