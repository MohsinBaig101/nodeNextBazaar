const mongoose = require('mongoose');

exports.bootstrap = async () => {
		let connectionString = process.env.DB_HOST;
	try {
			return await mongoose.connect(connectionString, {
				dbName: process.env.DBName,
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true
			});
		
	} catch (e) {
		throw new Error('Database is not connect on given string >> ' + connectionString);
	}
};