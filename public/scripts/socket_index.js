const socket = io();

socket.on('task:updated', task => {
    try {
      const text = document.querySelector(`[data-task-id="${task.id}"]`)
      if (!text) {
        throw new Error('text element not found.')
      }
      text.innerHTML = task.text
    } catch (error) {
      console.warn(error.message);
    }
})