import Task from '../../models/task'
import io from '../../server/io'

import type { ISoketTask } from './types'

const socket = io.sockets

class SoketTask implements ISoketTask {
  public async create(text: string): Promise<void> {
    const task = new Task({ text })
    const _id = task._id

    await task.save()

    socket.emit('task:created', { _id, text })

    return task
  }

  public async update(text: string, _id: string): Promise<void> {
    const task = await Task.findByIdAndUpdate(_id, { text }, { new: true })

    socket.emit('task:updated', { _id, text })

    return task
  }

  public async delete(_id: string): Promise<void> {
    await Task.findByIdAndDelete(_id)
    

    socket.emit('task:deleted', { _id })
  }
}

export default new SoketTask()
