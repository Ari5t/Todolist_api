import { Request, Response } from "express";

import Task from "../models/task";
import socket_task from "../services/SoketTask"


class APITaskController {
  public async getTasks(req: Request, res: Response) {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  }

  public async getTask(req: Request, res: Response) {
    const task = await Task.findById(req.params.id);

    res.status(200).json(task);
  }

  public async postTask(req: Request, res: Response) {
    const { text } = req.body;

    const task = await socket_task.create(text)
    
    res.status(201).json(task);
  }

  public async updateTask(req: Request, res: Response) {
    const { text } = req.body;
    const id = req.params.id;

    const task = await socket_task.update(text, id)

    res.status(202).json(task);
  }

  public async deleteTask(req: Request, res: Response) {
    const id = req.params.id;

    socket_task.delete(id)

    res.status(202).json(req.params.id);
  }
}

export default new APITaskController();
