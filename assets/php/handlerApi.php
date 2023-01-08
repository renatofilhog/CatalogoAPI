<?php

class handlerApi {
    private $token;
    private $grant_type = "password";
    private $client_id = "bebetenkiteapiv2";
    private $client_secret = "5871699427";
    private $username = "frenato";
    private $password = "renato10";
    private $stringReqToken = '';

    public function __construct(){

        $this->stringReqToken .= 'grant_type='.$this->grant_type.'&';
        $this->stringReqToken .= 'client_id='.$this->client_id.'&';
        $this->stringReqToken .= 'client_secret='.$this->client_secret.'&';
        $this->stringReqToken .= 'username='.$this->username.'&';
        $this->stringReqToken .= 'password='.$this->password;

        $result = $this->requerirPOST(
            "https://www30.bhan.com.br:9443/api/totvsmoda/authorization/v2/token",

            [
                'Accept: application/json',
                'Content-Type: application/x-www-form-urlencoded'
            ],
            $this->stringReqToken
        );
        $result = json_decode($result,true);
        $this->token = $result['access_token'];
    }

    public function getToken(){
        return $this->token;
    }

    public function requerirPOST($urlReq, $headers = [], $data){
        $ch = curl_init($urlReq);
        curl_setopt_array($ch, [
            // Equivalente ao -X:
            CURLOPT_POST => 1,
            // Equivalente ao -H:
            CURLOPT_HTTPHEADER => $headers,
            // -D
            CURLOPT_POSTFIELDS => $data,
            // Permite obter o resultado
            CURLOPT_RETURNTRANSFER => 1,
        ]);


        $result = curl_exec($ch);
       
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
        return $result;
    }

    public function requerirGET($urlReq, $headers = []){
        $ch = curl_init($urlReq);
        
        curl_setopt_array($ch,[
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => $headers
        ]);
        
        $result = json_decode(curl_exec($ch),true);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        } 
        curl_close($ch);
        return $result;
    }

    public function filtroProduto(
        $pageSize = 10, $page = 1, $classFilhas = ["132","131","133"]
    ){
        $arr = [
            "filter"=>[
                "hasPrice"=>true,
                "branchPriceCodeList" => [1,2],
                "priceCodeList" => [1],
                "hasStock" => true,
                "branchStockCode" => 9,
                "stockCode" => 1,
                "classifications" => [[
                    "type"=>105,
                    "codeList"=>$classFilhas
                ]]
            ],
            "option"=>[
                "branchInfoCode" => 2
            ],
            "page"=>$page,
            "pageSize"=>$pageSize,
            "expand"=>"barCodes,classifications",
            "order" =>"-referenceCode,productSize"
        ];

        return $arr;
    }

    public function filtroPreco(
        $precos = 1, $produtos
    ){
        $arr = [
            "filter"=>[
                "productCodeList"=>$produtos,
            ],
            "option"=>[
                "prices" => [[
                    "branchCode" => 2,
                    "priceCodeList" => $precos,
                    "isPromotionalPrice" => true
                ]]
            ],
            "page"=>1,
            "pageSize"=>10,
            "expand"=>"promotionalInformation",
            "order" =>"-referenceCode"
        ];

        return $arr;
    }





}

