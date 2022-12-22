import { Router } from "express";

import { RestPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/RestPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const restPasswordUserController = new RestPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", restPasswordUserController.handle);

export { passwordRoutes };
