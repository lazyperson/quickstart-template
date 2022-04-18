module.exports = function(app) {

	// get
	app.get('/home/content', function(req, res) {
		res.json({
			code: 0,
			data: {
				content: 'React framework front-end project template'
			},
			errMsg: ''
		});
	});

	// post
	app.post('/test', function(req, res) {
		res.json({
			id: 12,
			other: '...'
		})
	});

}
