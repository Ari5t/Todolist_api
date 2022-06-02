import Task from "../../models/task";
import io from "../../server/socket"

import type { ISoketTask } from "./types" 

const socket = io.sockets

class SoketTask implements ISoketTask{
  public async create(text: string): Promise<void> {
    const task = new Task({ text });
    const id = task._id;

    socket.emit("task:created", { id, text });

    await task.save();
  }
}

export default new SoketTask()