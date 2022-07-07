import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthentication } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

router.post('/tags',ensureAuthentication, ensureAdmin, createTagController.handle)
router.post('/users', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments',ensureAuthentication, createComplimentController.handle)

export { router }
