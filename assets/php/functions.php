<?php
require_once('APIBling.class.php');
require_once('Banco.class.php');

class Allure_Updates extends DadosAPI {
    public function updateProdutos($page){
		return parent::getProdutos($page);
	}
	public function todosProdutos(){
		return parent::getProdutosAll();
	}
}
?>
