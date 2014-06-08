config = require '../config/config'
fs = require 'fs'

module.exports = (cb) ->
	cb = cb ? () ->
	# Connect to the DB
	mongoose = require 'mongoose'
	mongoose.connect(config.dbURI)

	# Models
	models = __dirname + '/../models'
	fs.readdirSync(models).forEach (file) ->
	  require(models + '/' + file)

	cb()
