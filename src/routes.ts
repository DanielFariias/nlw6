import { Router } from "express";

import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsService";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsService";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";

import { ensureAuthentication } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router()

const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const createTagController = new CreateTagController()
const createUserController = new CreateUserController()

router.post('/tags',ensureAuthentication, ensureAdmin, createTagController.handle)
router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments',ensureAuthentication, createComplimentController.handle)

router.get(
  "/users/compliments/send",
  ensureAuthentication,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthentication,
  listUserReceiveComplimentsController.handle
);

export { router }
