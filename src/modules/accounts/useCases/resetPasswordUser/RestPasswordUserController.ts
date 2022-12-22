import { Request, Response } from "express";
import { container } from "tsyringe";

import { RestPasswordUserUseCase } from "./RestPasswordUserUseCase";

class RestPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(RestPasswordUserUseCase);

    await resetPasswordUserUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { RestPasswordUserController };
