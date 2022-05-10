const socket = io()
const chatForm = document.getElementById('chat')
const input = document.getElementById('input')
const feedback = document.getElementById('feedback')
const username = new URLSearchParams(window.location.search).get('nickname')
var cards = document.querySelectorAll('.card')

if (window.location.pathname === '/chat') {
	chatForm.addEventListener('submit', event => {
		event.preventDefault() // prevents the page from reloading
		// if there is at least one character inside the input field
		if (input.value) {
			socket.emit('chat-message', {
				msg: input.value, // refers to what the user has typed in the input field
				nickname: username, // refers to the user who send the message
			})
			input.value = '' // clears out the input field when someone submitted an message
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

	socket.on('typing', data => {
		if (username == data) {
			return
		}
		feedback.innerHTML = data + ' is typing..' // renders username + is typing.. to every user except the user who is typing
		feedback.scrollTop = feedback.scrollHeight
	})

	socket.on('stop-typing', () => {
		feedback.innerHTML = '' // clear out username is typing..
		feedback.scrollTop = feedback.scrollHeight
	})

	socket.on('chat-message', msg => {
		const item = document.createElement('li') // creates an list item
		messages.appendChild(item)
		item.textContent = `${msg.nickname}: ${msg.msg}` // displays the message and the nickname in the just created list item
		messages.scrollTop = messages.scrollHeight // scrolls to the bottom of the ul, so the most recent message are shown
	})

	socket.emit('user-connected', username) // emitting the username to the server

	socket.on('user-connected', username => {
		const item = document.createElement('li') // creates an list item
		messages.appendChild(item) // appends the new list item to the unordered list
		item.textContent = username + ' is connected' // Displays who is connected
		messages.scrollTop = messages.scrollHeight // scrolls to the bottom of the ul, so the most recent message are shown
	})

	socket.on('user-disconnected', () => {
		const item = document.createElement('li') // creates an list item
		messages.appendChild(item) // appends the new list item to the unordered list
		item.textContent = 'a user has disconnected' // Displays who is disconnected
		messages.scrollTop = messages.scrollHeight // scrolls to the bottom of the ul, so the most recent message are shown
	})
}

// 3d flip character cards
cards.forEach(card => {
	card.addEventListener('click', function () {
		card.classList.toggle('is-flipped') // adding the class when clicked and removing the class when clicks again
	})
})
