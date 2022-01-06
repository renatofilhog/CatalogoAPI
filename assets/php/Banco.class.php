<?php
require_once("APIBling.class.php");

class Banco extends DadosAPI {
    private $con;
    private $user = "root";
    private $pass = "";
    private $db = "catalogordf";
    private $ip = "localhost";
    
    public function __construct(){
        try {
            $this->con = new PDO("mysql:host={$this->ip};dbname={$this->db}", $this->user, $this->pass);
        } catch (PDOException $e) {
            echo $e->getMessage() . "<br>CODE: " . $e->getCode();
        }
    }
    public function testeComando(){
       
    }
    public function conferirIgual($sku){
		$res = $this->con->query("SELECT * FROM produtos WHERE sku='{$sku}';");
        if($res->rowCount() == 1){
            return true;
        } else {
            return false;
        }
	}
    public function editar($ar){
        $sku = $ar["sku"];
        $nome = $ar["nome"];
        $categoria = $ar["categoria"];
        $imgSrc = $ar["imgsrc"];
        $preco = $ar["preco"];
        $estoque = $ar["estoque"];
        $descricao = $ar["descricao"];
        
        $query = $this->con->prepare("UPDATE produtos SET nome=?, categoria=?, imgsrc=?, preco=?, estoque=?, descricao=? WHERE sku=?;");
        $query->bindValue(1,$nome);
        $query->bindValue(2,$categoria);
        $query->bindValue(3,$imgSrc);
        $query->bindValue(4,$preco);
        $query->bindValue(5,$estoque);
        $query->bindValue(6,$descricao);
        $query->bindValue(7,$sku);
        $query->execute();

    }

    public function load($page) {
        $results = json_decode(parent::getProdutos($page));
        $produtosArray = [];
        $erro = isset($results->retorno->erros[0]->erro->cod);
        if($erro == 1){
            return false;
        } else {
            foreach ($results->retorno->produtos as $chave => $item){
                $sku = $item->produto->codigo;
                $nome = $item->produto->descricao;
                $categoria = $item->produto->categoria->descricao;
                $preco = $item->produto->preco;
                $descricao = $item->produto->descricaoCurta;
                $imgSrc = "noimg";
                foreach($item->produto->imagem as $chave => $item2){
                    $imgSrc = $item2->link;
                }
                $estoque = 0;
                foreach($item->produto->depositos as $item){
                    if($item->deposito->desconsiderar == "N"){
                        $estoque += $item->deposito->saldo;
                    }
                }
                if($estoque>0 && $sku != ""){
                    $produto = [
                        "sku"=>$sku,
                        "nome"=>$nome,
                        "categoria"=>$categoria,
                        "imgsrc"=>$imgSrc,
                        "preco"=>$preco,
                        "estoque"=>$estoque,
                        "descricao"=>$descricao
                    ];
                    array_push($produtosArray,$produto);
                }
            }
            return $produtosArray;
        } 
    }

    public function insert($ar){
        
        $sku = $ar["sku"];
        $nome = $ar["nome"];
        $categoria = $ar["categoria"];
        $imgSrc = $ar["imgsrc"];
        $preco = $ar["preco"];
        $estoque = $ar["estoque"];
        $descricao = $ar["descricao"];

        if($this->conferirIgual($sku)){
            $this->editar($ar);
        } else {
            $query = $this->con->prepare("INSERT INTO produtos(sku, nome, categoria, imgsrc, preco, estoque, descricao) VALUES (?,?,?,?,?,?,?)");
            $query->bindValue(1,$sku);
            $query->bindValue(2,$nome);
            $query->bindValue(3,$categoria);
            $query->bindValue(4,$imgSrc);
            $query->bindValue(5,$preco);
            $query->bindValue(6,$estoque);
            $query->bindValue(7,$descricao);
            $query->execute();
        }
        
    }

    public function puxarDados($indice,$qnt){
        $res = $this->con->query("SELECT * FROM produtos LIMIT {$indice},{$qnt}");
        
        if($res->rowCount()>0){
            return $res->fetchAll();
        } else {
            return false;
        }
    }
    
    public function puxarCategoria(){
        $res = $this->con->query("SELECT DISTINCT categoria FROM produtos ORDER BY categoria asc;");
        if($res->rowCount()>0){
            return $res->fetchAll();
        }
    }

    public function puxarDadosCat($indice,$qnt,$cat){
        $res = $this->con->query("SELECT * FROM produtos WHERE categoria='{$cat}' LIMIT {$indice},{$qnt}");
        
        if($res->rowCount()>0){
            return $res->fetchAll();
        } else {
            return false;
        }
    }
}