var knex = require('knex')({
  client: 'mysql',
  connection: {
	   host: 'localhost',  // your host
	   user: 'root', // your database user
	   password: 'root', // your database password
	   database: 'dbUsers',
	   charset: 'UTF8_GENERAL_CI'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
   tableName: 'tblUsers',
   idAttribute: 'userId',
});

module.exports = {
   User: User
};