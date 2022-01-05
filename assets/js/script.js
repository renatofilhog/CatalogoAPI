const c = (item) => document.querySelector(item);
const cs = (item) => document.querySelectorAll(item);
let carrinho = [];


const switchCategoria = (idCat) => {
    if(idCat=="tudo"){
        c("#listaCategorias li.active").classList.remove("active");
        c("#listaCategorias li span.active").classList.remove("active");
        let item = c("#listaCategorias li:first-child");
        item.classList.add("active");
        item.querySelector("span").classList.add("active");
        c("#categoriaAtual").innerHTML = c("#categorias ul li.active:not(span)").innerHTML;
    } else {
        let nomeCategoria = JSON.parse(dadosCategoria).find((item)=>{
            return item.id == idCat;
        });
        c("#listaCategorias li.active").classList.remove("active");
        c("#listaCategorias li span.active").classList.remove("active");
        let item = c(`[data-id-cat="${nomeCategoria.id}"]`);
        item.classList.add("active");
        item.querySelector("span").classList.add("active");
        c("#categoriaAtual").innerHTML = c("#categorias ul li.active:not(span)").innerHTML;
    }
}

const closeModal = () => {
    c('.modal--product').style.opacity = 0;
    setTimeout(function(){
        c('.modal--product').style.display = 'none';
    }, 500);
    c("#title-product").innerHTML = "";
    c("#cat-product").innerHTML = "";
    c(".product-image img").src = "";
    c("#price-product").innerHTML = "";
    c(".qt-prod").innerHTML = "1";
    c(".product-infos .desc").innerHTML = ""
}
const openModal = (elem) => {
    c('.modal--product').style.opacity = 0;
    c('.modal--product').style.display = 'flex';
    setTimeout(()=>{
        c('.modal--product').style.opacity = 1;
    },100);
    c("#title-product").innerHTML = elem.querySelector("h4").innerHTML;
    c("#title-product").setAttribute("data-sku",elem.querySelector("h4").getAttribute("data-sku"));
    c("#cat-product").innerHTML = elem.querySelector("p").innerHTML;
    c(".product-image img").src = elem.querySelector(".product--img img").src;
    c("#price-product").innerHTML = elem.querySelector("h2").innerHTML;
    c(".product-infos .desc").innerHTML = elem.querySelector(".descricaoModal").innerHTML;
    c("#qt-estoq").innerHTML = elem.querySelector(".product--infos h2").getAttribute("data-estoque");
    c(".exit-modal").addEventListener("click",closeModal);
}


const diminuirQnt = ()=> {
    let qtModal = parseInt(c(".qt-prod").innerHTML);
    let qtModalAntes = qtModal;
    if( qtModal > 1 ){
        qtModal--;
        c(".qt-prod").innerHTML = qtModal;
        attTotal(qtModal,qtModalAntes);
    }
};
const aumentarQnt = ()=> {
    let qtModal = parseInt(c(".qt-prod").innerHTML);
    let qtModalAntes = qtModal;
    qtModal++;
    c(".qt-prod").innerHTML = qtModal;
    attTotal(qtModal,qtModalAntes);
};
c('.minus').addEventListener("click",diminuirQnt);
c('.plus').addEventListener("click",aumentarQnt);

const attTotal = (qt,qtAntes) => {
    let precoModal = c("#price-product").innerHTML.substr(3,99);
    precoModal = parseFloat(precoModal.replace(",","."));
    let precoUnit = precoModal/qtAntes;
    precoModal = precoUnit * qt;
    precoModal = (precoModal.toFixed(2)).toString().replace(".",",");
    let stringPreco = `R$ ${precoModal}`;
    c("#price-product").innerHTML = stringPreco;
};

const addCarrinho = () => {
    let skuProduto = c("#title-product").getAttribute("data-sku");
    let quantidadeAtual = parseInt(c(".button-cart .qt-prod").innerHTML);
    let indexAr = carrinho.findIndex((item)=>{
        return skuProduto == item.skuProduto;
    });
    if(indexAr >= 0){
        let precoUnit = carrinho[indexAr].subtotalItem / +carrinho[indexAr].quantidade;
        carrinho[indexAr].quantidade = +carrinho[indexAr].quantidade + quantidadeAtual;
        carrinho[indexAr].subtotalItem = precoUnit * carrinho[indexAr].quantidade;
        attCarrinho();
        closeModal();
    } else {
        let caminhoImg = c(".product-image img").src;
        let nomeProduto = c("#title-product").innerHTML;
        let precoAtual = c("#price-product").innerHTML.substr(3,99);
        precoAtual = parseFloat(precoAtual.replace(",","."));
        let carrinhoItem = {
            "caminhoImg":caminhoImg,
            "nomeProduto":nomeProduto,
            "skuProduto":skuProduto,
            "quantidade":quantidadeAtual,
            "subtotalItem":precoAtual
        };
        carrinho.push(carrinhoItem);
        attCarrinho();
        closeModal();
    }
}
const attCarrinho = () => {
    c(".qnt-box").innerHTML = carrinho.length;
    c(".products-cart").innerHTML = "";
    let totalItens = 0;
    if(carrinho.length < 1) {
        fecharCarrinho();        
    } else {
        carrinho.forEach((item,index)=>{
            let itemNovo = c(".model .item-cart").cloneNode("true");
            itemNovo.querySelector(".miniatura-imagem img").src = item.caminhoImg;
            itemNovo.querySelector(".nome-produto-carrinho").innerHTML = item.nomeProduto;
            let sku = item.skuProduto;
            itemNovo.querySelector(".nome-produto-carrinho").setAttribute("data-sku",sku);
            itemNovo.querySelector(".qt-cart-prod").innerHTML = item.quantidade;
            itemNovo.querySelector(".price-cart").innerHTML = "R$ "+item.subtotalItem.toFixed(2).replace(".",",");
            itemNovo.querySelector(".qt-cart-minus").addEventListener("click",()=>{
                diminuirQntCart(sku);
            });
            itemNovo.querySelector(".qt-cart-plus").addEventListener("click",()=>{
                aumentarQntCart(sku);
            });
            totalItens += item.subtotalItem;
            c(".products-cart").appendChild(itemNovo);
        });
    }
    c(".total-cart").innerHTML = "R$ "+totalItens.toFixed(2).replace(".",",");
};
const abrirCarrinho = () => {
    if(carrinho.length > 0){
        c('.modal-cart').style.opacity = 0;
        c('.modal-cart').style.display = 'flex';
        setTimeout(()=>{
            c('.modal-cart').style.opacity = 1;
        },100);
    }
}
const fecharCarrinho = () => {
    c('.modal-cart').style.opacity = 0;
    setTimeout(()=>{
        c('.modal-cart').style.display = 'none';
    },500);
}
c(".box--cart").addEventListener("click",abrirCarrinho);
c(".fechar-carrinho").addEventListener("click",fecharCarrinho);
c('#add-product-cart').addEventListener("click",addCarrinho);


const finalizarCompra = () => {
    let total = 0;
    let pedido = "Resumo Pedido *Rosa do Deserto Fortaleza* %0d%0a\n";
    pedido += "Carrinho: %0d%0a\n";
    carrinho.forEach((item,index)=>{
        pedido += `Item: ${index} %0d%0a\n`;
        pedido += `- Produto: ${item.nomeProduto} %0d%0a\n`;
        pedido += `- - SKU: ${item.skuProduto} %0d%0a\n`;
        pedido += `- - Quantidade: ${item.quantidade} %0d%0a\n`;
        pedido += `- - Subtotal: ${item.subtotalItem} %0d%0a%0d%0a%0d%0a\n \n \n`;
        total += item.subtotalItem;
    });
    pedido += `%0d%0a%0d%0a\n \n Total: ${total} %0d%0a\n`;
    pedido += `_Agradecemos a preferência_`;
    let a = document.createElement('a');
    a.target="_blank";
    a.href="https://api.whatsapp.com/send?phone=5585997495640&text="+pedido;
    a.click();
    a.removeChild();
}
c(".footer-cart button").addEventListener("click",finalizarCompra);







const diminuirQntCart = (sku)=> {
    let indexAr = undefined;
    let atualItem = carrinho.find((item,index)=>{
        if(item.skuProduto == sku){
            indexAr = index;
            return item;
        }
    });
    if(carrinho[indexAr].quantidade>1) {
        let precoUnit = carrinho[indexAr].subtotalItem / parseInt(carrinho[indexAr].quantidade);
        carrinho[indexAr].quantidade = parseInt(carrinho[indexAr].quantidade) - 1;
        carrinho[indexAr].subtotalItem = precoUnit * +carrinho[indexAr].quantidade;
        attCarrinho();
    } 
    if(carrinho[indexAr].quantidade == 1) {
        carrinho.splice(indexAr,1);
        attCarrinho();
    }
};

const aumentarQntCart = (sku)=> {
    let indexAr = undefined;
    let atualItem = carrinho.find((item,index)=>{
        if(item.skuProduto == sku){
            indexAr = index;
            return item;
        }
    });
    let precoUnit = carrinho[indexAr].subtotalItem / parseInt(carrinho[indexAr].quantidade);
    carrinho[indexAr].quantidade = parseInt(carrinho[indexAr].quantidade) + 1;
    carrinho[indexAr].subtotalItem = precoUnit * +carrinho[indexAr].quantidade;
    attCarrinho();
};

