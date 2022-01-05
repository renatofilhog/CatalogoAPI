<?php
	//adiciono meu arquivo de functions
	require_once('Banco.class.php');
	//instacio minha classe
	$Allure = new Banco();
	//chamo meu método passando as variaveis de controle da query e guardo numa variavel
	$categorias = $Allure->puxarCategoria();
	if($categorias){	
		print_r(json_encode($categorias));
	} else {
		print_r('{"retorno":false}');
	}