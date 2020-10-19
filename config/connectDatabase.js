const mongoose = require('mongoose');

exports.bootstrap = async () => {
		let connectionString = process.env.DB_HOST;
	try {
			return await mongoose.connect(connectionString, {
				dbName: process.env.DB_NAME,
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true
			});
			console.log('connection build successfully');
	} catch (e) {
		throw new Error('Database is not connect on given string >> ' + connectionString);
	}
};