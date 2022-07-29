const socket = io("/", {
    transports: ["websocket"],
    path: '/socket',
});

const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault()
    const _id = event.target.elements._id.value
    const text = event.target.elements.text.value
    if (text <= 0) return alert("Заполните поле текстом")
    socket.emit('task:update', { _id, text })
    window.location.href = "/"
})