<?php    
	class DadosAPI {
		private $apikey = "d175c08415f1ff256508d238a0094c3e21a0a133a5bcbd48e99de96f4602a12034c647f9";
		private $outputType = "json";
		private $url = "";
		public function getProdutos($page) {
			$this->url = 'https://bling.com.br/Api/v2/produtos/page='.$page.'/' . $this->outputType;
			$retorno = $this->executeQueryAPI("&estoque=S&imagem=S&situacao=A");
			return $retorno;
		}

		private $page = 1;
		private $produtosArray = [];
		public function getProdutosAll() {
			$this->url = 'https://bling.com.br/Api/v2/produtos/page='.$this->page.'/' . $this->outputType;
			$retorno = $this->executeQueryAPI("&estoque=S&imagem=S&situacao=A");
			if($retorno->retorno->erros[0]->erro->cod == 14){
			    return $this->produtosArray;
			} else {
			    $this->page += 1;
				$this->salvarProdutos($retorno);
				sleep(0.35);
				$this->getProdutosAll();
			}
		}
		private function salvarProdutos($ret){
			$produtos = json_decode($ret);
			foreach($produtos->retorno->produtos as $item){
				array_push($this->produtosArray,$item);
			}
		}
		
		private function executeQueryAPI($adicional=""){
			$curl_handle = curl_init();
			curl_setopt($curl_handle, CURLOPT_URL, $this->url . '&apikey=' . $this->apikey  .  $adicional);
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, TRUE);
			$response = curl_exec($curl_handle);
			curl_close($curl_handle);
			return $response;
		}
	}
?>