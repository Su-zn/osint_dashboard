import { Router } from "express";
import osintRouter from "../modules/osint/osint.routes.js";

const router = Router();

router.use('/osint', osintRouter);

export default router;