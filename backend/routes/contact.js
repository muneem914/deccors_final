import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  addOrUpdateMessage,
  deleteContact,
  getAllContacts,
  getContactDetails,
} from "../controllers/contactControllers.js";

const router = express.Router();
router.route("/contact").post(addOrUpdateMessage);

router
  .route("/admin/contacts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllContacts);
router
  .route("/admin/contacts/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getContactDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContact);

export default router;
