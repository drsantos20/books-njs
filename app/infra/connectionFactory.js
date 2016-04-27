var mysql = require('mysql');

if(process.env.NODE_ENV == 'test') {
		function createDBConnection(){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'casadocodigo_nodejs'
		});
	}
}

if(process.env.NODE_ENV == 'production') {
		function createDBConnection(){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'casadocodigo_nodejs'
		});
	}
}



module.exports = function(){
	return createDBConnection;
}