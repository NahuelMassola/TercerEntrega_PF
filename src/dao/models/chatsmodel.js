const mongoose = require('mongoose')

const collectionMessage = 'messages'

const chatsSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		require: true,
	},
	message: {
		type: String,
		require: true,
	},
})
const chatsModel = mongoose.model(collectionMessage, chatsSchema )

module.exports = chatsModel