import express from "express";
import {
  getLanguages,
  generateReadme,
  generateAllReadmes,
} from "../controllers/readme.controller.js";

const router = express.Router();

// GET  /api/readme/languages    — list all supported language codes
router.get("/languages", getLanguages);

// POST /api/readme/generate     — generate README in a single language
router.post("/generate", generateReadme);

// POST /api/readme/generate-all — generate READMEs for all languages at once
router.post("/generate-all", generateAllReadmes);

export default router;
