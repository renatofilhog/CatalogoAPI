<?php
	include_once("handlerApi.php");
	$req = new handlerApi();

	//recebo via post minha variavel enviada pelo ajax
	if(isset($_POST['page'])){
		$indice = intval($_POST['page']);
	} else {
		$indice = 1;
	}
	
	// Qnt de data recebido
	if(isset($_POST['qnt'])){
		$qnt = intval($_POST['qnt']);
	} else {
		$qnt = 20;
	}
	
	// Receber categoria
	if($_POST['categoria'] != "null" && isset($_POST['categoria'])){
		$codeCategoria[] = strval($_POST['categoria']);
	} else {
		$codeCategoria = $req->getCategorias();
	}

	// Url requisição:
	$urlReq = 'https://www30.bhan.com.br:9443/api/totvsmoda/product/v2/references/search';
	$headers[] = 'Authorization: Bearer '.$req->getToken();
	$headers[] = 'Content-Type: application/json';
	$headers[] = 'accept: application/json';

	$filtro = $req->filtroProduto($qnt, $indice, $codeCategoria);
	$filtro["expand"] = "classifications,additionalFields,webDetail, referenceCategories";
	//chamo meu método passando as variaveis de controle da query e guardo numa variavel
	$produtos = $req->requerirPOST(
		$urlReq,
		$headers,
		json_encode($filtro)
	);

	

	if($produtos){	
		print_r($produtos);
	} else {
		print_r('{"retorno":false}');
	}