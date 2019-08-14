require('dotenv').config();
module.exports = {
	mongo: {
		stringPattern:
			'mongodb+srv://[USERNAME]:[PASSWORD]@[DB_HOST]/test?retryWrites=true&w=majority',
		dbuser: process.env.DB_USERNAME,
		dbpass: process.env.DB_PASSWORD,
		dbhost: process.env.DB_HOST,
		getString() {
			return this.stringPattern
				.replace('[USERNAME]', this.dbuser)
				.replace('[PASSWORD]', this.dbpass)
				.replace('[DB_HOST]', this.dbhost);
		},
		options: {
			useNewUrlParser: true
		}
	}
};
