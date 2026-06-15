import { Router } from "express";
import { analyzeHandler } from "../osint/osint.controller.js"

const router  = Router();

router.post('/analyze', analyzeHandler);
router.get('/analyze', analyzeHandler);

export default router;