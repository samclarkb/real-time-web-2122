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

// Empty variables
let dataSet = null
let randomCharacter = null
let characterAndNicknameArray = []
let nickname = null

app.get('/', (req, res) => {
	fetchData() // Declaring the fetch function on the home page
	res.render('home')
})

// putting the fetch in a global variable, so the data is globally available
const fetchData = () => {
	return fetch(`https://naruto-api.herokuapp.com/api/v1/characters`) // external API
		.then(res => res.json())
		.then(data => {
			randomCharacter = randomizer(data.slice(24, 38)) // applying the randomizer function to the characters 24 till 38
			dataSet = {
				data: filteredNames(data).slice(24, 38), // fetching 14 characters, starting with character 24 and endning with the 38th
				randomCharacter,
			}
		})
}

const correctAnswer = (character, nickname) => {
	// pushes the name of the character and the nickname into the empty array
	characterAndNicknameArray.push({
		character: character.name,
		name: nickname,
	})
}

app.get('/chat', (req, res) => {
	const nickname = req.query.nickname // refers to the input field where the user sets his nickname
	res.render('chat', { dataSet, nickname })
})

const randomizer = data => {
	return data[Math.floor(Math.random() * data.length)] // takes one random object out of the array
}

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

io.on('connection', socket => {
	socket.on('user-connected', username => {
		io.emit('user-connected', username)
	})

	socket.on('new-user', user => {
		nickname = user.username // getting the username of the Client
		if (randomCharacter) {
			correctAnswer(randomCharacter, nickname)
		}
		console.log(characterAndNicknameArray) // logging the username + the character of an specific user
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
		// search within the array variable if character.name is equal to the message. If so, correct will be displayed in the chat room.
		// character refers to character.name within the characterAndNicknameArray array
		if (
			characterAndNicknameArray.find(item => {
				return item.character === msg.msg // Checks if the user filled in the correct character as answer
			})
		) {
			io.emit('chat-message', { nickname: 'Computer', msg: 'Correct!' }) // Displays Computer: correct! when a user guesses the right answer
		}
		io.emit('chat-message', msg) // emitting chat-message event and the msg object to the client
	})
})

// tell the server to listen on port 7000
server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`)
})
