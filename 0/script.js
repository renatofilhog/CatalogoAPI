const c = (item) => document.querySelector(item);
const cs = (item) => document.querySelectorAll(item);

// retorno.erros[0].erro.cod == 14
const pegarProdutos1 = ()=>{
    let page = 0;
    for(let i=0;i<200;i++){
        console.log('Entrou no For');
        fetch('http://bling.com.br/Api/v2/produtos/page='+page+'/json/?apikey=4ff45300069178b2cead956158be5ef31c0bb7016d23e03498821cc739ecbe8277b52815&estoque=S&imagem=S&situacao=A')
            .then((resolve)=>{
                console.log('Primeiro Resolve');
                resolve.json()
                    .then((resolve)=>{
                        console.log("Segundo resolve");
                        if(resolve.retorno.erros[0].erro.cod == '14'){
                            console.log("If dos Erros");
                            i = 201;
                        } else {
                            console.log("Adicionando produtos");
                            let produtos = resolve.retorno.produtos;
                                produtos.map(
                                    (item,index) => {
                                        // CLonando model
                                        let it = c('.produto-cat').cloneNode(true);
                                        
                                        it.querySelector('.title-cat').innerHTML = item.produto.categoria.descricao;
                                        it.querySelector('.desc').innerHTML = item.produto.descricao;
                                        it.querySelector('.preco').innerHTML = `R$ ${parseFloat(item.produto.preco).toFixed(2)}`;
                                        let saldo = item.produto.depositos[0].deposito.saldo;
                                        it.querySelector('.estoque').innerHTML = parseInt(saldo);
                                        //it.querySelector('.img').innerHTML = "Sem Imagem";
                                        if(item.produto.imagem.length > 0){
                                            it.querySelector('.img img').src = item.produto.imagem[0].link;
                                        } else {
                                            it.querySelector('.img').innerHTML = "Sem Imagem";
                                        }
                                        c('.container').append(it);
                                    }
                                );
                            page++;
                        }
                    })
                    
                    .catch((error)=>{
                        console.log("Bad mistake");
                    })
                ;
            })
            .catch((error)=>{
                console.log("error", error)
            })
        ;
    }
    
}
const pegarProdutos = ()=>{

    fetch('http://bling.com.br/Api/v2/produtos/json/?apikey=4ff45300069178b2cead956158be5ef31c0bb7016d23e03498821cc739ecbe8277b52815&estoque=S&imagem=S&situacao=A')
        .then((resolve)=>{
            resolve.json().then((resolve)=>{
                let produtos = resolve.retorno.produtos;
                console.log(produtos[0].produto);
                //console.log(produtos[25].produto.imagem[0].link);
                produtos.map(
                    (item,index) => {
                        // CLonando model
                        let it = c('.produto-cat').cloneNode(true);
                        
                        it.querySelector('.title-cat').innerHTML = item.produto.categoria.descricao;
                        it.querySelector('.desc').innerHTML = item.produto.descricao;
                        it.querySelector('.preco').innerHTML = `R$ ${parseFloat(item.produto.preco).toFixed(2)}`;
                        let saldo = item.produto.depositos[0].deposito.saldo;
                        it.querySelector('.estoque').innerHTML = parseInt(saldo);
                        //it.querySelector('.img').innerHTML = "Sem Imagem";
                        if(item.produto.imagem.length > 0){
                            it.querySelector('.img img').src = item.produto.imagem[0].link;
                        } else {
                            it.querySelector('.img').innerHTML = "Sem Imagem";
                        }
                        c('.container').append(it);
                    }
                );
            });
        })
        .catch((error)=>{
            console.log("Deu ruim Irmão",error);
        })
    ;
}

//pegarProdutos();
