module.exports = {
	mongo: {
		stringPattern:
			'mongodb+srv://[USERNAME]:[PASSWORD]@cluster0-aqagd.gcp.mongodb.net/test?retryWrites=true&w=majority',
		dbuser: 'omniapp',
		dbpass: 'app123321',
		getString() {
			return this.stringPattern
				.replace('[USERNAME]', this.dbuser)
				.replace('[PASSWORD]', this.dbpass);
		},
		options: {
			useNewUrlParser: true
		}
	}
};
