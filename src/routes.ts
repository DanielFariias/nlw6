import { Router } from "express";

import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsService";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsService";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";

import { ensureAuthentication } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router()

const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const listUsersController = new ListUsersController()
const listTagsController = new ListTagsController()


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

router.get("/tags", ensureAuthentication, listTagsController.handle);

router.get("/users", ensureAuthentication, listUsersController.handle);

export { router }
