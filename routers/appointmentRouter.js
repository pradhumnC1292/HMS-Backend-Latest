import express from "express";
import {
  isPatientAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
import {
  makeAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, makeAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
