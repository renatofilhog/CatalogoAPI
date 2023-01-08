<?php
include_once("handlerApi.php");

echo "<pre>";
$req = new handlerApi();

function carregarCategorias(){
    $arr = [];
    $req = new handlerApi();
    $urlReq = 'https://www30.bhan.com.br:9443/api/totvsmoda/product/v2/category?Order=-code';
    $headers = [
        'Accept: application/json',
        'Authorization: Bearer '.$req->getToken()
    ];
    $arr = $req->requerirGET($urlReq, $headers);   
    return $arr;
}

$arr = carregarCategorias();

//print_r(json_encode($arr));
echo $arr;