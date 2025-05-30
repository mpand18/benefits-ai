import express from "express";
import { askLLM } from "../services/openRouterService.js";
import benefits from "../data/benefits.json" assert { type: "json" };

const router = express.Router();

router.post("/", async (req, res) => {
  const { promptBase } = req.body;
  const prompt = `${promptBase}\n\nLista de beneficios:\n${JSON.stringify(benefits, null, 2)}`;
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
