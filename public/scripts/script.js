const socket = io()
const chatForm = document.getElementById('chat')
const nicknameForm = document.getElementById('nickname')
const input = document.getElementById('input')
const nicknameInput = document.getElementById('nickname-input')
const feedback = document.getElementById('feedback')
const username = new URLSearchParams(window.location.search).get('nickname')

if (window.location.pathname === '/chat') {
	chatForm.addEventListener('submit', event => {
		event.preventDefault()
		if (input.value) {
			socket.emit('chat-message', {
				msg: input.value,
				nickname: username,
			})
			input.value = ''
		}
	})

	let isUserTyping = false
	input.addEventListener('keyup', function () {
		const value = input.value
		if (value && !isUserTyping) {
			isUserTyping = true
			socket.emit('typing', username)
		} else if (!value && isUserTyping) {
			isUserTyping = false
			socket.emit('stop-typing', username)
		}
	})

	socket.on('typing', function (data) {
		if (username == data) {
			return
		}
		feedback.innerHTML = data + ' is typing..'
	})

	console.log(username)

	socket.on('chat-message', msg => {
		const item = document.createElement('li')
		console.log(msg)
		item.textContent = `${msg.nickname}: ${msg.msg}`
		messages.appendChild(item)
		window.scrollTo(0, document.body.scrollHeight)
	})

	socket.on('connected', msg => {
		const item = document.createElement('li')
		item.textContent = msg
		messages.appendChild(item)
		window.scrollTo(0, document.body.scrollHeight)
	})

	socket.on('disconnected', msg => {
		const item = document.createElement('li')
		item.textContent = msg
		messages.appendChild(item)
		window.scrollTo(0, document.body.scrollHeight)
	})
}

var cards = document.querySelectorAll('.card')

cards.forEach(card => {
	card.addEventListener('click', function () {
		card.classList.toggle('is-flipped')
	})
})
