import {Request, Response, Router} from "express";
import {handlerAPI} from "./utils";
import { RolesController } from "./controllers/role";
import {UserController} from "./controllers/user";
const router = Router();

router.get('/users',handlerAPI(UserController.list))
router.post('/users', handlerAPI(UserController.addUser));
router.patch('/users/:id', handlerAPI(UserController.updateUser));
router.delete('/users/:id', handlerAPI(UserController.deleteUser));
router.get('/roles', handlerAPI(RolesController.list))

export default router;
