var knex = require('knex')({
  client: 'mysql',
  connection: {
	   host: 'us-cdbr-iron-east-03.cleardb.net',  // your host
	   user: 'b2b9ea565e5785', // your database user
	   password: 'afe978b0', // your database password
	   database: 'heroku_7abc9251d3ac94f',
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
