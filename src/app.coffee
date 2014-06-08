# Override console.log in production
# We are doing this bc it kills Heroku performance
console.log = if global.process.env.NODE_ENV? and global.process.env.NODE_ENV is 'live' then () -> else console.log

express = require('express')
app = express()
server = require('http').createServer(app)
passport = require 'passport'
config = require './config/config'
fs = require 'fs'
env = require 'node-env-file'

# Read evironment vars from file if no environment exists
# Load ENV vars
if typeof(global.process.env.NODE_ENV) is 'undefined'
	if fs.existsSync(__dirname + '/../env/development.env')
		env(__dirname + '/../env/development.env')

# Connect to the DB
mongoose = require 'mongoose'

# if global.process.env.NODE_ENV is 'production'
# 	mongoose.connect(config.dbURI+'?slaveOk=true&connectTimeoutMS=10000')
# else

mongoose.connect(global.process.env.MONGOHQ_URI)

# Models
models = __dirname + '/models'
fs.readdirSync(models).forEach (file) ->
  require(models + '/'  +file)

# Passport Config
require('./config/passport')(passport, config)

# Express Config
require('./config/express')(app, passport)

# Routes
require('./config/routes')(app, passport)

port = process.env.PORT or 3000
server.listen port, () -> 
  console.log "Server running on port " + port


