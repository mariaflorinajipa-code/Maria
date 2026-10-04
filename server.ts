import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client if GEMINI_API_KEY is available
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health/Status check
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    hasApiKey: Boolean(apiKey),
    model: 'gemini-3.8-flash',
  });
});

// Generation endpoint
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { type, businessType, customBusiness, service, audience, tone, network, city, extraNotes } = req.body;

    if (!businessType || !service) {
      return res.status(400).json({ error: 'Faltan campos requeridos (tipo de negocio y servicio)' });
    }

    const business = businessType === 'otro' ? customBusiness || 'Negocio local' : businessType;
    const locationInfo = city ? `Ubicado en: ${city}` : 'Negocio local';

    if (!aiClient) {
      return res.status(503).json({
        error: 'Sin clave de API de Gemini configurada',
        fallbackNeeded: true,
      });
    }

    let prompt = '';
    let systemInstruction = `Eres un estratega experto en marketing digital y creación de contenido en redes sociales para pequeños negocios en español.
Tu tarea es generar contenido realista, profesional, atractivo y de alto valor para Instagram y TikTok.
No hagas promesas falsas de ventas garantizadas o millones de seguidores. Enfócate en aportar valor, conectar con la comunidad, resolver dudas y mostrar la calidad del servicio.
Devuelve SIEMPRE la respuesta en formato JSON estrictamente válido según la estructura requerida.`;

    if (type === 'all') {
      prompt = `Genera un paquete completo de contenidos para redes sociales para este negocio:
- Tipo de negocio: ${business}
- Servicio/Producto: ${service}
- Público objetivo: ${audience || 'Clientes locales'}
- Tono: ${tone || 'Cercano y profesional'}
- Red: ${network || 'Instagram y TikTok'}
- Contexto: ${locationInfo}. ${extraNotes ? `Detalles extra: ${extraNotes}` : ''}

Devuelve un JSON estrictamente estructurado con este formato:
{
  "ideas": [
    {
      "id": "1",
      "title": "Título corto y llamativo",
      "format": "Reel" | "Carrusel" | "Post Estático" | "Historias Interactivas",
      "hook": "Gancho inicial llamativo",
      "concept": "Qué mostrar y explicar en el contenido",
      "goal": "Objetivo de la publicación",
      "tip": "Consejo técnico o de grabación"
    }
  ],
  "scripts": [
    {
      "id": "1",
      "title": "Nombre del guion de Reel",
      "duration": "15-20 seg",
      "hook": "Gancho verbal inicial (0-3s)",
      "musicSuggestion": "Estilo de música o audio en tendencia",
      "scenes": [
        {
          "time": "0-3s",
          "visual": "Descripción visual de la escena",
          "audio": "Lo que se dice",
          "onScreenText": "Texto en pantalla"
        },
        {
          "time": "3-15s",
          "visual": "...",
          "audio": "...",
          "onScreenText": "..."
        },
        {
          "time": "15-22s",
          "visual": "...",
          "audio": "...",
          "onScreenText": "..."
        }
      ],
      "callToAction": "Llamada a la acción final",
      "caption": "Pie de vídeo listo con emojis",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    }
  ],
  "posts": [
    {
      "id": "1",
      "type": "Educativo" | "Promocional" | "Detrás de cámaras",
      "headline": "Gancho de primera línea",
      "body": "Cuerpo persuasivo estructurado",
      "callToAction": "Llamada a la acción",
      "hashtagsNiche": ["#tagNicho1", "#tagNicho2", "#tagNicho3"],
      "hashtagsLocal": ["#tagLocal1", "#negociolocal"],
      "hashtagsTrend": ["#viral", "#tendencia"]
    }
  ],
  "calendar": [
    {
      "week": 1,
      "weekFocus": "Tema de la semana",
      "items": [
        {
          "id": "w1-1",
          "day": "Lunes",
          "format": "Reel",
          "topic": "Tema",
          "hook": "Gancho",
          "objective": "Atracción",
          "shortDescription": "Descripción"
        }
      ]
    }
  ]
}
Incluye 6 ideas, 3 guiones de reels de 15-30 segundos, 3 publicaciones completas con hashtags, y 4 semanas de calendario mensual (con 3 días por semana).`;
    } else if (type === 'ideas') {
      prompt = `Genera un paquete de 6 ideas de publicaciones virales y prácticas para el siguiente negocio:
- Tipo de negocio: ${business}
- Servicio/Producto a destacar: ${service}
- Público objetivo: ${audience || 'Clientes locales interesados en calidad y buen trato'}
- Tono: ${tone || 'Cercano y profesional'}
- Red social principal: ${network || 'Instagram y TikTok'}
- Contexto: ${locationInfo}. ${extraNotes ? `Detalles extra: ${extraNotes}` : ''}

Devuelve un JSON con este formato exacto:
{
  "ideas": [
    {
      "id": "1",
      "title": "Título corto y llamativo",
      "format": "Reel" | "Carrusel" | "Post Estático" | "Historias Interactivas",
      "hook": "Gancho inicial o texto en portada para detener el scroll",
      "concept": "Explicación breve de qué mostrar en la publicación (máximo 3 frases)",
      "goal": "Objetivo (ej: Generar confianza, Atraer clientes nuevos, Mostrar antes/después, Responder dudas frecuentes)",
      "tip": "Consejo rápido de grabación o diseño"
    }
  ]
}`;
    } else if (type === 'scripts') {
      prompt = `Genera 3 guiones detallados para Reels / TikTok de 15 a 30 segundos para este negocio:
- Tipo de negocio: ${business}
- Servicio/Producto: ${service}
- Público objetivo: ${audience}
- Tono: ${tone}
- Red: ${network}
- Contexto: ${locationInfo}

Devuelve un JSON con este formato exacto:
{
  "scripts": [
    {
      "id": "1",
      "title": "Nombre del guion",
      "duration": "15-20 seg" o "20-30 seg",
      "hook": "Frase de gancho inicial (0-3 seg) que se dice o muestra en grande",
      "musicSuggestion": "Estilo de audio o tendencia musical recomendada",
      "scenes": [
        {
          "time": "0-3s",
          "visual": "Descripción visual de lo que se ve en cámara",
          "audio": "Lo que se dice en voz en off o a cámara",
          "onScreenText": "Texto corto que aparece en pantalla"
        },
        {
          "time": "3-15s",
          "visual": "...",
          "audio": "...",
          "onScreenText": "..."
        },
        {
          "time": "15-25s",
          "visual": "...",
          "audio": "...",
          "onScreenText": "..."
        }
      ],
      "callToAction": "Llamada a la acción final clara (ej: Guarda este video para tu próxima cita / Escríbenos por DM para reservar)",
      "caption": "Pie de foto completo para acompañar el vídeo con emojis y llamada a comentarios",
      "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"]
    }
  ]
}`;
    } else if (type === 'posts') {
      prompt = `Genera 3 textos completos para publicaciones de Instagram/TikTok para:
- Negocio: ${business}
- Servicio/Producto: ${service}
- Público: ${audience}
- Tono: ${tone}
- Red: ${network}
- Contexto: ${locationInfo}

Devuelve un JSON con este formato exacto:
{
  "posts": [
    {
      "id": "1",
      "type": "Educativo / Consejo" | "Promoción / Oferta limitada" | "Detrás de cámaras / Conexión",
      "headline": "Gancho inicial de la primera línea",
      "body": "Cuerpo del texto persuasivo, con saltos de línea bien estructurados, puntos clave y emojis moderados",
      "callToAction": "Llamada a la acción precisa (ej: 'Comenta INFO y te enviamos el catálogo')",
      "hashtagsNiche": ["#hashtagEspecífico1", "#hashtagEspecífico2", "#hashtagEspecífico3"],
      "hashtagsLocal": ["#hashtagLocal1", "#hashtagLocal2", "#negociolocal"],
      "hashtagsTrend": ["#viral", "#tendencia", "#fyp"]
    }
  ]
}`;
    } else if (type === 'calendar') {
      prompt = `Genera un calendario de contenido mensual estructurado de 4 semanas (con 3 a 4 publicaciones estratégicas por semana, un total de 14 a 16 contenidos) para:
- Negocio: ${business}
- Servicio/Producto: ${service}
- Público: ${audience}
- Tono: ${tone}
- Red: ${network}
- Contexto: ${locationInfo}

Devuelve un JSON con este formato exacto:
{
  "calendar": [
    {
      "week": 1,
      "weekFocus": "Tema central de la semana (ej: Presentación y confianza)",
      "items": [
        {
          "id": "w1-1",
          "day": "Lunes",
          "format": "Reel",
          "topic": "Tema o título de la publicación",
          "hook": "Gancho para llamar la atención",
          "objective": "Atracción" | "Confianza" | "Venta" | "Interacción",
          "shortDescription": "Breve descripción de cómo ejecutar el post"
        }
      ]
    }
  ]
}`;
    } else {
      return res.status(400).json({ error: 'Tipo de generación no válido' });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      // Try to clean markdown fences if any
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({ success: true, data: parsedData, isAiGenerated: true });
  } catch (error: any) {
    console.error('Error generating content with Gemini:', error);
    return res.status(500).json({
      error: error?.message || 'Error al comunicarse con el servicio de IA',
      fallbackNeeded: true,
    });
  }
});

// Setup Vite middleware in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NexaIA Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
