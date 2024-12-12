import express from "express";
import { checkPackgeDependency } from "../controllers/dependencyController";
const router = express.Router();

router.post("/check-dependency-health", checkPackgeDependency);
export default router;
