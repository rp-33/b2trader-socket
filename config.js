'use strict';
const dotenv = require('dotenv');

dotenv.config();

var config = {
	server:{
		port : process.env.PORT || 8080
	}
};

module.exports = config;
