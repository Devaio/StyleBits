#Projects controller

mongoose = require 'mongoose'
Project = mongoose.model('Project')
Main = require './main'


# if global.process.env.NODE_ENV.s3Key
# 	s3 = require 's3'
# 	s3Client = s3.createClient
# 		key : global.process.env.NODE_ENV.s3Key
# 		secret : global.process.env.NODE_ENV.s3Secret
# 		bucket : global.process.env.NODE_ENV.s3Bucket


class Projects extends Main

	constructor : () ->
		super(Project)

	get : (req, res) ->
		super(req, res)

	delete : (req, res) ->
		super(req, res)

	upsert : (req, res) ->
		self = @
		body = req.body
		project = {}
		

		project.title = body.title
		

		super project, req, res

module.exports = new Projects()
