import Task from "../models/task";
import { Request, Response } from "express";

class TaskControllers {
  public async getTask(req: Request, res: Response) {
    const tasks = await Task.find();
    res.render("index", { tasks });
  }

  public async postTask(req: Request, res: Response) {
    const { text } = req.body;
    const task = new Task({ text });
    await task.save();

    res.status(201).json(task);
  }

  public async updateGetTask(req: Request, res: Response) {
    const tasks = await Task.findById(req.params.id);
    res.render("edit", { tasks });
  }

  public async updateTask(req: Request, res: Response) {
    const { text } = req.body;
    const id = req.params.id;

    req.app.get("io").sockets.emit("task:updated", { id, text });
    const task = await Task.findByIdAndUpdate(id, { text }, { new: true });

    res.status(202).json(task);
  }

  public async deleteTask(req: Request, res: Response) {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);

    req.app.get("io").sockets.broadcast.emit("task:deleted", { id });
    res.status(202).json(req.params.id);
  }
}

export default new TaskControllers();
