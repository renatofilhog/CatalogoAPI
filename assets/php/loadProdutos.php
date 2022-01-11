<?php
	//adiciono meu arquivo de functions
	require_once('Banco.class.php');
	//recebo via post minha variavel enviada pelo ajax
	$indice = $_POST['page'];
	// Recebo a categoria
	$categoria = strtoupper($_POST['cat']);
	// Recebo a ordenação:
	$ord = $_POST['ord'];
	switch($ord){
		case "menor-preco":
			$ordenacao = "preco";
			$rank = "ASC";
			break;
		case "maior-preco":
			$ordenacao = "preco";
			$rank = "DESC";
			break;
		case "menor-estoque":
			$ordenacao = "estoque";
			$rank = "ASC";
			break;
		case "maior-estoque":
			$ordenacao = "estoque";
			$rank = "DESC";
			break;
		default:
			$ordenacao = "id";
			$rank = "ASC";
	}
	// Qnt de data recebido
	$qnt = 20;
	//instacio minha classe
	$Allure = new Banco();
	//chamo meu método passando as variaveis de controle da query e guardo numa variavel
	$produtos = $Allure->puxarDados($indice,$qnt,$ordenacao,$rank,$categoria);
	if($produtos){	
		print_r(json_encode($produtos));
	} else {
		print_r('{"retorno":false}');
	}