import express from "express";

import {
  findAll,
  findByUser,
  findByHome,
  updateUsers,
} from "../controller/userController";

const router = express.Router();

router.get("/user/find-all", findAll);
router.get("/home/find-by-user/:userId", findByUser);
router.get("/user/find-by-home/:homeId", findByHome);
router.put("/home/update-users/:homeId", updateUsers);

export default router;
