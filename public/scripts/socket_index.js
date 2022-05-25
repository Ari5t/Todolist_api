const socket = io();


//update
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

//delete
const btnDeletes = document.querySelectorAll(".delete");
for (let btnDelete of btnDeletes) {
    btnDelete.addEventListener("click", () => {
        const id = btnDelete.dataset.id
        socket.emit('task:delete', {id})
        delete_obj(id)
    });
}

socket.on('task:deleted', ({id}) => {
    delete_obj(id)
})

function delete_obj(id){
    const element = document.getElementById(id);
        element.remove();
}