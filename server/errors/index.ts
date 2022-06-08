import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.send(`<p>${error.message}</p><pre>${error.stack}</pre>`).status(500)
}