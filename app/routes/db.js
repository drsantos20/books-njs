var knex = require('knex')({
  client: 'mysql',
  var url = process.env.CLEARDB_DATABASE_URL;
  var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
  connection: {
	host:grupos[3],
	user:grupos[1],
	password:grupos[2],
	database:grupos[4]
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});
