<?php
include_once("handlerApi.php");
$req = new handlerApi();
$arr = [];
$urlReq = 'https://www30.bhan.com.br:9443/api/totvsmoda/product/v2/prices/search';

$headers[] = 'Authorization: Bearer '.$req->getToken();
$headers[] = 'Content-Type: application/json';
$headers[] = 'accept: application/json';

$produtos[] = 1471;
if(isset($_POST['produto'])){
    $produtos = array(intval($_POST["produto"]));
}

$filtro = $req->filtroPreco(
    [1], $produtos
);
$preco = $req->requerirPOST(
    $urlReq,
    $headers,
    json_encode($filtro)
);

if($preco){	
    print_r($preco);
} else {
    print_r('{"retorno":false}');
}