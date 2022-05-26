const socket = io();

const form = document.querySelector('form')

    form.addEventListener('submit', event => {
        event.preventDefault()
        const id = event.target.elements.id.value
        const text = event.target.elements.text.value
        socket.emit('task:update', { id, text })
        window.location.href = "/"
    })