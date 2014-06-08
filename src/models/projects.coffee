# Projects Model

mongoose = require 'mongoose'
Schema = mongoose.Schema
moment = require 'moment'


#Project Collection
projects = new Schema
	title : {type : String}
	date : {type : String, default : moment().format('X')}
	content : {type : String}
	
	


mongoose.model 'Project', projects