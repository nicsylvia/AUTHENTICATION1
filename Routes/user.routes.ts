import { Router } from "express";

import { getUsers, login, register } from "../Controller/users.controller";

const router = Router();

router.route("/registeruser").post(register)
router.route("/getallusers").get(getUsers)
router.route("/login").post(login);

export default router;