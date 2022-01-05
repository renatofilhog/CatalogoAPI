<?php
	//adiciono meu arquivo de functions
	require_once('Banco.class.php');
	
	//instacio minha classe
	$Allure = new Banco();
    
	// chamo meu método passando as variaveis de controle da query e guardo numa variavel
    $page = 1;

    $continuar = true;
    while($continuar == true){
        $arrayRecebido = $Allure->load($page);
        if($arrayRecebido == false) {
            $continuar = false;
        } else {
            foreach($arrayRecebido as $chave => $item){
                $Allure->insert($item);
            }
            $page+=1;
        }
    }

    header("Location: /catalogo/index.php");