<?php
define("AMBIENTE", "desenvolvimento");

define("USER", AMBIENTE == "desenvolvimento" ? "renato":"userProducao");
define("PASS", AMBIENTE == "desenvolvimento" ? "renato":"senhaProducao");
define("DB", AMBIENTE == "desenvolvimento" ? "catalogoprodutos":"bancoproducao");
define("IP", AMBIENTE == "desenvolvimento" ? "localhost":"localhost");

class ConnBanco {
    public $conn;
    public function __construct(){
        try {
            $this->conn = new PDO("mysql:host=".IP.";dbname=".DB."", USER, PASS);
        } catch (PDOException $e) {
            echo $e->getMessage() . "<br>CODE: " . $e->getCode();
        }
    }
    public function returnConn(){
        return $this->conn;
    }
}
