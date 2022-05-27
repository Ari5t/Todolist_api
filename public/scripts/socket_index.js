const socket = io();
let btnDeletes = document.querySelectorAll(".delete");

//create
const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault()
    const text = event.target.elements.text.value
    if (text <= 0) return alert("Заполните поле с текстом")
    socket.emit('task:create', { text })
    window.location.reload()
})

//created
socket.on('task:created', ({ id, text }) => {
    const li = document.createElement("li")
    const ul = document.querySelector("ul")

    li.id = id
    li.innerHTML = `
    <div>
        <span data-task-id="${id}">${text}</span>
        <a href="/edit/${id}"><span>Edit</span></a>
        <button data-id="${id}" class="delete">Delete</button>
    </div>
    `
    ul.append(li);
})

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
document.getElementById("ul").addEventListener("click", (event) => {
  if (event.target.className === 'delete'){
    const id = event.target.dataset.id
    socket.emit('task:delete', {id})
    del_obj(id)
  }
  });

socket.on('task:deleted', ({id}) => {
    del_obj(id)
})

function del_obj(id){
    const element = document.getElementById(id);
    element.remove();
}