<?php
include_once("handlerApi.php");
$req = new handlerApi();
$arr = [];
$urlReq = 'https://www30.bhan.com.br:9443/api/totvsmoda/product/v2/category?Order=-code';
$headers = [
    'Accept: application/json',
    'Authorization: Bearer '.$req->getToken()
];

$arr = $req->requerirGET($urlReq, $headers);

print_r(json_encode($arr));
