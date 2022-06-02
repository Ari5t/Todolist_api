import { Request, Response } from "express";

import { validationResult } from "express-validator";

import Task from "../models/task";
import socket_task from "../service/socket_task";

class APITaskController {
  public async getTasks(req: Request, res: Response) {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  }

  public getTask(req: Request, res: Response) {
    const task = Task.findById(req.params.id);

    res.status(200).json(task);
  }

  public async postTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;

    const task = socket_task.create(text)

    res.status(200).json(task);
  }

  public async updateTask(req: Request, res: Response) {
    const { text } = req.body;
    const id = req.params.id;

    req.app.get("io").sockets.emit("task:updated", { id, text });
    const task = await Task.findByIdAndUpdate(id, { text }, { new: true });

    res.status(200).json(task);
  }

  public async deleteTask(req: Request, res: Response) {
    const id = req.params.id;

    req.app.get("io").sockets.emit("task:deleted", { id });
    await Task.findByIdAndDelete(id);

    res.status(200).json(req.params.id);
  }
}

export default new APITaskController();
