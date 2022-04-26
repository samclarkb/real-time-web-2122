require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const fetch = require('node-fetch')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/chat', (req, res) => {
	const nickname = req.query.nickname
	fetch(`https://naruto-api.herokuapp.com/api/v1/characters`)
		.then(res => res.json())
		.then(data => {
			res.render('chat', {
				nickname,
				data: names(data).slice(18, 39),
			})
		})
})

const names = data => {
	const filterdNames = data.map(item => {
		console.log('name', item.name)
		return {
			...item, // spread entire object
			name: item.name.replace('_', ' '),
		}
	})
	return filterdNames
}

io.on('connection', socket => {
	// console.log(socket.nickname, 'lol')
	io.emit('connected', 'a user has connected')

	socket.on('typing', function (data) {
		io.emit('typing', data)
	})

	socket.on('disconnect', () => {
		io.emit('disconnected', 'a user has disconnected')
	})

	socket.on('send-nickname', nickname => {
		socket.nickname = nickname
		io.emit('send-nickname', {
			nickname: socket.nickname,
		})
	})

	socket.on('chat-message', msg => {
		io.emit('chat-message', msg)
	})
})

server.listen(process.env.PORT, () => {
	console.log(`listening on *:${process.env.PORT}`)
})
