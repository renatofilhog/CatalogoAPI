<?php
require_once("APIBling.class.php");
define("AMBIENTE", "desenvolvimento");

class Banco extends DadosAPI {
    private $con;
        private $user = AMBIENTE == "desenvolvimento" ? "root":"u218871904_crdf";
        private $pass = AMBIENTE == "desenvolvimento" ? "":"md5(RDF)";
        private $db = AMBIENTE == "desenvolvimento" ? "catalogordf":"u218871904_crdf";
        private $ip = AMBIENTE == "desenvolvimento" ? "localhost":"localhost";
    
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
        sleep(0.35);
        $results = parent::getProdutos($page);
        $produtosArray = [];
        $erro =0;
        if(isset($results->erros[0]->erro->cod)){
            $erro = 1;
        };
        if($erro == 1){
            echo $erro;
            echo "entrou aqui";
            return $produtosArray;
        } else {
            foreach ($results->produtos->produto as $chave => $item){
                $sku = $item->codigo;
                $nome = $item->descricao;
                $categoria = $item->categoria->descricao;
                $preco = $item->preco;
                $descricao = $item->descricaoCurta;
                $imgSrc = "noimg";
                foreach($item->imagem as $chave => $item2){
                    $imgSrc = $item2->link;
                }
                $estoque = 0;
                foreach($item->depositos as $item){
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
            if(count($produtosArray) == 0){
                return 99;
            } else {
                return $produtosArray;
            }
        }
    }

    public function insert($ar){
        
        $sku = $ar["sku"];
        $nome = $ar["nome"];
        $categoria = strtoupper($ar["categoria"]);
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

    public function puxarDados($indice,$qnt,$ord,$rank,$cat){
        if($cat == "PADRAO"){
            $res = $this->con->query("SELECT * FROM produtos ORDER BY {$ord} {$rank} LIMIT {$indice},{$qnt}");
        
            if($res->rowCount()>0){
                return $res->fetchAll();
            } else {
                return false;
            }
        } else if ($cat != "padrao"){
            $res = $this->con->query("SELECT * FROM produtos WHERE categoria='{$cat}' ORDER BY {$ord} {$rank} LIMIT {$indice},{$qnt}");
        
            if($res->rowCount()>0){
                return $res->fetchAll();
            } else {
                return false;
            }
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

    public function search($search) {
        $res = $this->con->query("SELECT * FROM produtos WHERE nome LIKE '%{$search}%'");
        if($res->rowCount()>0){
            return $res->fetchAll();
        } else {
            return false;
        }
    }
}