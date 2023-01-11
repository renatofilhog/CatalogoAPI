<?php
include_once("handlerApi.php");
$req = new handlerApi();
$arr = [];
$urlReq = 'https://www30.bhan.com.br:9443/api/totvsmoda/product/v2/balances/search';

$headers[] = 'Authorization: Bearer '.$req->getToken();
$headers[] = 'Content-Type: application/json';
$headers[] = 'accept: application/json';

$reference[] = "003 BB CST474";
if(isset($_POST['reference'])){
    $reference = array($_POST["reference"]);
}

$filtro = $req->filtroStock(
    $reference
);
$stock = $req->requerirPOST(
    $urlReq,
    $headers,
    json_encode($filtro)
);

if($stock){	
    print_r($stock);
} else {
    print_r('{"retorno":false}');
}