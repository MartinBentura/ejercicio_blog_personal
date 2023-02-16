const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { commentAuthenticate } = require("../middlewares/isAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.get("/login", loginController.loginIndex);
router.post("/login", loginController.login);

router.get("/", makeUserAvailableInViews, mainController.index);
router.get("/articulo/:id", mainController.selectArticle);

// AuTH COMMENTS
router.post("/articulo/:id", commentAuthenticate, commentController.createComment);
//AUTH COMMENTS

router.get("/admin", isAuthenticated, mainController.indexAdmin);
router.get("/admin/crear", isAuthenticated, mainController.createForm);
router.post("/admin", mainController.createArticle);
router.get("/admin/editar/:id", mainController.editForm);
router.post("/admin/editar/:id", mainController.editArticle);
router.get("/admin/eliminar/:id", mainController.deleteArticle);

router.get("/users", userController.getUsers);

module.exports = router;
