import Task from "../../models/task";
import io from "../../server/socket"

import type { ISoketTask } from "./types" 

const socket = io.sockets

class SoketTask implements ISoketTask{
  public async create(text: string): Promise<void> {
    
  }
}

export default new SoketTask()