<?php
	//adiciono meu arquivo de functions
	require_once('Banco.class.php');
	
	//instacio minha classe
	$Allure = new Banco();
    
	// chamo meu método passando as variaveis de controle da query e guardo numa variavel
    $page = 1;

    $continuar = true;
    $i=1;
    
    while($continuar == true){
        
        $arrayRecebido = $Allure->load($page);
        if($arrayRecebido == false) {
            
            $continuar = false;
            print_r($arrayRecebido);
        } else if ($arrayRecebido == 99) {
            echo "Página ".$page." não tem registros";
            echo "Rodou ".$i." vezes. Página: ".$page." <br>";
            $i++;
            $page+=1;
        } else {
            foreach($arrayRecebido as $chave => $item){
                $Allure->insert($item);
            }
            echo "Rodou ".$i." vezes. Página: ".$page." <br>";
            $i++;
            $page+=1;
        }
    }