<?php
include_once("ConnBanco.php");

$connBanco = new ConnBanco();
$db = $connBanco->returnConn(); 
//exemplo
//$stmt = $db->query("SELECT * FROM produto");
//$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
