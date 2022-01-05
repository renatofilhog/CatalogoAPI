<?php
	//adiciono meu arquivo de functions
	require_once('functions.php');
	
	//instacio minha classe
	$Allure = new Allure_Updates();
	// chamo meu método passando as variaveis de controle da query e guardo numa variavel

	$produtos = $Allure->todosProdutos();
    print_r(gettype($produtos));