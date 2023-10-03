import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth-middleware.js";
import articleController from "../controllers/articleController.js";
import fileController from "../controllers/fileController.js";
import { upload } from "../middleware/multer-middleware.js";

const router = new Router();

router.post(
  "/auth/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.signUp,
);
router.post("/auth/login", userController.login);

router.post(
  "/articles",
  upload.single("pdf"),
  authMiddleware,
  articleController.createArticle,
);
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:title", articleController.getArticle);

router.get("/download/:fn", fileController.download);

export default router;
