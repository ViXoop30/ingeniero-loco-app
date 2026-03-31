import { GoogleGenAI } from "@google/genai";

export const generateTechImages = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompts = [
    "Futuristic AI neural network visualization, glowing blue and orange data streams, dark background, high-tech aesthetic, 4k, cinematic lighting.",
    "Close-up of a high-tech circuit board with glowing light pulses, representing system orchestration, dark brutalist style, neon accents.",
    "Abstract digital landscape with floating code blocks and holographic interfaces, futuristic software development theme."
  ];

  const results = [];
  for (const prompt of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        },
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results.push(`data:image/png;base64,${part.inlineData.data}`);
      }
    }
  }
  return results;
};

export const generateWowVideo = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: 'The AI core pulses with energy, data streams flowing through neural pathways, cinematic motion, high-tech atmosphere',
    image: {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(downloadLink!, {
    method: 'GET',
    headers: {
      'x-goog-api-key': process.env.GEMINI_API_KEY!,
    },
  });
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
