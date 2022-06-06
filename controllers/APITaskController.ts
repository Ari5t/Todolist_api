import { Request, Response, text } from "express"

import Task from "../models/task"
import socket_task from "../services/SoketTask"

class APITaskController {
  public async getTasks(_req: Request, res: Response) {
    const tasks = await Task.find()

    res.status(200).json(tasks)
  }

  public async getTask(req: Request, res: Response) {
    const task = await Task.findById(req.params.id)

    res.status(200).json(task)
  }

  public async postTask(req: Request, res: Response) {
    const task = await socket_task.create(req.body.text)

    res.status(201).json(task)
  }

  public async updateTask(req: Request, res: Response) {
    const task = await socket_task.update(req.body.text, req.params.id)

    res.status(202).json(task)
  }

  public async deleteTask(req: Request, res: Response) {
    socket_task.delete(req.params.id)

    res.status(204)
  }
}

export default new APITaskController()