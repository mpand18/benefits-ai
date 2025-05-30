import express from "express";
import { askLLM } from "../services/openRouterService.js";
import benefits from "../data/benefits.json" assert { type: "json" };
import profiles from "../data/profiles.json" assert { type: "json" };

const router = express.Router();

router.post("/", async (req, res) => {
    const { promptBase } = req.body;
  const profileSummary = profiles.map(p =>
    `- ID: ${p.id}, segmento: ${p.segment}, preferencias: ${p.preferences.join(", ")}`
  ).join("\n");


  const benefitsSummary = benefits.map(b =>
    `- Nombre: ${b.name}, tipo: ${b.type}`
  ).join("\n");

    const prompt = `
Tengo esta lista de perfiles de usuario:
${profileSummary}

Y esta lista de beneficios:
${benefitsSummary}

Paso 1: Listame los IDs de los perfiles que recibiste.  
Paso 2: Listame los nombres exactos de los beneficios que recibiste.  
Paso 3:  ${promptBase}
    
   
  Por favor, respondé usando SOLO estos datos. 
    No incluyas ningún otro texto.
    La respuesta final debe estar solo en este formato:

[
  {
    "perfilId": "001",
    "mejorBeneficio": "2x1 en café Andatti",
    "porQueLoElegiste": "Explicación breve..."
  },
  ...
    `; 
  if (!prompt) {
    return res.status(400).json({ error: "Debes enviar un prompt" });
  }
  try {
    const response = await askLLM(prompt);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: "Error al consultar el LLM" });
  }
});

export default router;
