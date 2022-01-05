<?php
	//adiciono meu arquivo de functions
	require_once('Banco.class.php');
	//recebo via post minha variavel enviada pelo ajax
	$indice = $_POST['page'];
	// Qnt de data recebido
	$qnt = 60;
	//instacio minha classe
	$Allure = new Banco();
	//chamo meu método passando as variaveis de controle da query e guardo numa variavel
	$produtos = $Allure->puxarDados($indice,$qnt);
	if($produtos){	
		print_r(json_encode($produtos));
	} else {
		print_r('{"retorno":false}');
	}