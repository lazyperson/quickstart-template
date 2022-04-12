const fs = require('fs');
const path = require('path');
const express = require('express');

function findSync(startPath) {
	let result = [];
	let files = fs.readdirSync(startPath);

	files.forEach(val => {
		let file = path.join(startPath, val);
		let stats = fs.statSync(file);

		if(stats.isDirectory()) {
			result.push(...findSync(file));
		} else if(stats.isFile()) {
			result.push(file);
		}
	});

	return result;
}

const log = (msg, color = '32m') => {
	console.log('-'.repeat(msg.length + 2));
	console.log('\033[40;'+ color +' '+ msg +' \033[0m');;
	console.log('-'.repeat(msg.length + 2));
}

const mockServer = (mockFolder, app) => {

	app.use(express.json()); // for parsing application/json
	app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	findSync(mockFolder).forEach(dir => require(dir)(app));

	log('Mock: service started successfully ✔', '32m');
}

module.exports = {
	mockServer
};
