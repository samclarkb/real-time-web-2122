require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http') // require HTTP so we can make connection with a server
const server = http.createServer(app) // create an HTTP server
const { Server } = require('socket.io')
const io = new Server(server)
const fetch = require('node-fetch')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/chat', (req, res) => {
	const nickname = req.query.nickname // refers to the input field where the user sets his nickname
	fetch(`https://naruto-api.herokuapp.com/api/v1/characters`) // external API
		.then(res => res.json())
		.then(data => {
			res.render('chat', {
				nickname, // renders the the nickname of the user, so we can display the username in the chatroom
				data: filteredNames(data).slice(24, 38), // fetching 14 characters, starting with character 24 and endning with the 38th
				randomCharacter: randomizer(data.slice(24, 38)), // applying the randomCharacter function to the characters 24 till 38
			})
		})
})

const randomizer = data => {
	return data[Math.floor(Math.random() * data.length)] // takes one random object out of the array
}

const filteredNames = data => {
	const filterNames = data.map(item => {
		return {
			...item, // spreading the array of characters to arguments, so I can apply .replace() to the array
			name: item.name.replace('_', ' '), // Cleaning the names of the characters, removing underscore
		}
	})
	return filterNames
}

io.on('connection', socket => {
	socket.on('user-connected', username => {
		io.emit('user-connected', username)
	})

	socket.on('disconnect', () => {
		io.emit('user-disconnected')
	})

	socket.on('typing', data => {
		io.emit('typing', data)
	})

	socket.on('stop-typing', data => {
		io.emit('stop-typing', data)
	})

	socket.on('chat-message', msg => {
		io.emit('chat-message', msg) // emitting chat-message event and the msg object to the client
	})
})

// tell the server to listen on port 7000
server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`)
})
