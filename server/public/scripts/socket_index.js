const socket = io("/", {
  transports: ["websocket"],
  path: '/socket',
})
let btnDeletes = document.querySelectorAll(".delete");

//create
const form = document.querySelector('form')

form.addEventListener('submit', event => {
  event.preventDefault()
  const text = event.target.elements.text.value
  if (text <= 0) {
    return alert("Заполните поле с текстом")
  }
  socket.emit('task:create', { text })
  window.location.reload()
})

//created
socket.on('task:created', ({ _id, text }) => {
  const li = document.createElement("li")
  const ul = document.querySelector("ul")

  li.id = _id
  li.innerHTML = `
  <div>
    <span data-task-id="${_id}">${text}</span>
    <a href="/edit/${_id}"><span>Edit</span></a>
    <button data-id="${_id}" class="delete">Delete</button>
  </div>
  `
  ul.append(li);
})

//update
socket.on('task:updated', task => {
  try {
    const text = document.querySelector(`[data-task-id="${task._id}"]`)
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
  if (event.target.className === 'delete') {
    const _id = event.target.dataset.id
    socket.emit('task:delete', { _id })
    del_obj(_id)
  }
});

socket.on('task:deleted', ({ _id }) => {
  del_obj(_id)
})

function del_obj(_id) {
  const element = document.getElementById(_id);
  element.remove();
}