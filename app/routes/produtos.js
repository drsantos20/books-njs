module.exports = function(app){	
	var listaProdutos = function(req,res){	
	var connection = app.infra.connectionFactory();
	var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(erros,resultados){
			res.render('produtos/lista',{lista:resultados});
		});

		connection.end();
	};
	

	app.get("/produtos", listaProdutos);

	app.get('produtos/remove',function(){
		var connection = app.infra.connectionFactory();
		var produtosDAO = app.infra.ProdutosDAO(connection);
		var produto = produtosDAO.carrega(id,callback);
		if(produto){
			produtosDAO.remove(produto,callback)
		}
	});

	app.get('/produtos/form',function(req,res){
		res.render('produtos/form', {validationErrors:{}, produto: {}});		
	});

	//app.get('/produtos',listaProdutos);

	//get para recuperar //post para enviar
	app.post('/produtos',function(req,res){

		//express fornece o body no request
		var produto = req.body;
		console.log(produto);

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
			
		var validadorTitulo = req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();

        if(errors){
              res.format({
                html: function(){
                    res.status(400).render("produtos/form",{validationErrors:errors,produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });
            return;
        }

        produtosDAO.salva(produto,function(erros,resultados){
			//usar redirect para evitar o refresh/f5 do navegador
			res.redirect('/produtos');
		});	
		connection.end();
	});
}
