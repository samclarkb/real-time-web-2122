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

let dataSet = null
let randomCharacter = null

app.get('/', (req, res) => {
	fetchData() //
	res.render('home')
})

const fetchData = () => {
	return fetch(`https://naruto-api.herokuapp.com/api/v1/characters`) // external API
		.then(res => res.json())
		.then(data => {
			randomCharacter = randomizer(data.slice(24, 38))
			dataSet = {
				// nickname, // renders the the nickname of the user, so we can display the username in the chatroom
				data: filteredNames(data).slice(24, 38), // fetching 14 characters, starting with character 24 and endning with the 38th
				randomCharacter, // applying the randomCharacter function to the characters 24 till 38
			}
		})
}

const correctAnswer = (character, nickname) => {
	// array.push({ [nickname]: character.name })
	array.push({
		character: character.name,
		name: nickname,
	})
}

app.get('/chat', (req, res) => {
	fetchData()
	const nickname = req.query.nickname // refers to the input field where the user sets his nickname
	res.render('chat', { dataSet, nickname })
})

const randomizer = data => {
	return data[Math.floor(Math.random() * data.length)] // takes one random object out of the array
}

let array = []

const filteredNames = data => {
	// console.log(randomizer(data.slice(24, 38)).name)
	const filterNames = data.map(item => {
		return {
			...item, // spreading the array of characters to arguments, so I can apply .replace() to the array
			name: item.name.replace('_', ' '), // Cleaning the names of the characters, removing underscore
		}
	})
	return filterNames
}

let nickname = null

io.on('connection', socket => {
	socket.on('user-connected', username => {
		io.emit('user-connected', username)
	})

	socket.on('new-user', user => {
		nickname = user.username
		if (randomCharacter) {
			correctAnswer(randomCharacter, nickname)
		}
		console.log(array)
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
		console.log(array)
		io.emit('chat-message', msg) // emitting chat-message event and the msg object to the client
		if (
			array.find(item => {
				return item.character.toLowerCase() === msg.msg.toLowerCase()
			})
		) {
			console.log('magic')
			io.emit('correct')
			io.emit('chat-message', { msg: 'Correct!', nickname: 'computer' })
		}
	})
})

// tell the server to listen on port 7000
server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`)
})
