import Task from "../../models/task";
import io from "../../server/io";

import type { ISoketTask } from "./types" 

const socket = io.sockets

class SoketTask implements ISoketTask{
  public async create(text: string): Promise<void> {
    const task = new Task({ text });
    const id = task._id;

    await task.save();

    socket.emit("task:created", { id, text });

    return task
  }

  public async update(text: string, id: string): Promise<void>{
    const task = await Task.findByIdAndUpdate(id, { text }, { new: true })

    socket.emit('task:updated', { id, text })

    return task
  }

  public async delete(id: string): Promise<void> {
    await Task.findByIdAndDelete(id)

    socket.emit('task:deleted', { id })
  }
}

export default new SoketTask()