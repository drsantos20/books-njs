function ProdutosDAO(connection){
	this._connection = connection;

}

ProdutosDAO.prototype.lista = function(callback){
	this._connection.query('select * from livros',callback);
}

ProdutosDAO.prototype.salva = function(produto,callback){
	this._connection.query('insert into livros set ?', produto,callback);
	/*
	em caso das colunas serem diferentes dos nomes dos campos
	{
		titulo : '',
		preco : '',
		descricao : ''
	}
	*/
}

module.exports = function(){
	return ProdutosDAO;	
}


