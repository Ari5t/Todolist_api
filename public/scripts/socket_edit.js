const socket = io();

const form = document.querySelector('form')

    form.addEventListener('submit', event => {
        event.preventDefault()
        const id = event.target.elements.id.value
        const text = event.target.elements.text.value
        if (text <= 0) return alert("Заполните поле текстом")
        socket.emit('task:update', { id, text })
        window.location.href = "/"
    })