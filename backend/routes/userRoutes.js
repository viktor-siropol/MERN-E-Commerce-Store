import express from "express";
import { createUser, LoginUser,  LogoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserbyId, getUserById, updateUserProfileById} from "../controllers/userController.js";
import {authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router();

router
      .route("/")
      .post(createUser)
      .get(authenticate, authorizeAdmin, getAllUsers);
router.route("/auth").post(LoginUser);
router.route("/logout").post(LogoutUser);
router
      .route("/profile")
      .get(authenticate, getCurrentUserProfile)
      .put(authenticate, updateCurrentUserProfile);
router
      .route("/:id")
      .delete(authenticate, authorizeAdmin, deleteUserbyId)
      .get(authenticate, authorizeAdmin, getUserById)
      .put(authenticate, authorizeAdmin, updateUserProfileById);



export default router;
