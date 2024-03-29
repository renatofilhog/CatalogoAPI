const c = (item) => document.querySelector(item);
const cs = (item) => document.querySelectorAll(item);
let carrinho = [];
var modalOpen = 0;
const closeModal = () => {
    c('.modal--product').style.opacity = 0;
    setTimeout(function(){
        c('.modal--product').style.display = 'none';
    }, 500);
    c("#title-product").innerHTML = "";
    c("#cat-product").innerHTML = "";
    c(".product-image img").src = "";
    c("#price-product").innerHTML = "";
    
    c(".product-infos .desc").innerHTML = "";
    c("header").style.position = "fixed";
    c(".subir-topo").style.display = "flex";
    document.querySelectorAll("#tr-stock:not(.model-stock)").forEach((item)=>{item.remove()});
    modalOpen = 0;
}
const openModal = (elem) => {
    

    c('.modal--product').style.opacity = 0;
    c('.modal--product').style.display = 'flex';
    setTimeout(()=>{
        c('.modal--product').style.opacity = 1;
    },100);
    const optionsStock = {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `reference=${elem.querySelector("h4").getAttribute("data-sku")}`
    };
    fetch("./assets/php/loadStock.php",optionsStock).then((response)=>{
        response.json().then((r)=>{
            r.items.forEach((item)=>{
                let colorCode = item.colorCode;
                let tam = document.querySelectorAll("tr[data-cor='"+colorCode+"']").length;
                let qtStock = item.balances[0].stock;
                if(tam<1){
                    let cloneTRStock = document.querySelector(".model-stock").cloneNode("TRUE");
                    cloneTRStock.setAttribute("data-cor",colorCode);
                    cloneTRStock.classList.remove("model-stock");
                    cloneTRStock.querySelector("#table-stock-color").innerHTML = item.colorName;
                    cloneTRStock.querySelector("td[data-tam='"+item.sizeName+"']").innerHTML = qtStock;
                    document.querySelector(".stock-table").appendChild(cloneTRStock);
                } else {
                    let element = document.querySelector("tr[data-cor='"+colorCode+"']");
                    element.querySelector("td[data-tam='"+item.sizeName+"']").innerHTML = qtStock;
                }
            });
        })
    });
    c("#title-product").innerHTML = elem.querySelector("h4").innerHTML;
    c("#title-product").setAttribute("data-sku",elem.querySelector("h4").getAttribute("data-sku"));
    c("#cat-product").innerHTML = elem.querySelector("p").innerHTML;
    c(".product-image img").src = elem.querySelector(".product--img img").src;
    c("#price-product").innerHTML = elem.querySelector("h2").innerHTML;
    
    c("#exit-modal").addEventListener("click",closeModal);
    c("header").style.position = "static";
    c(".subir-topo").style.display = "none";
    modalOpen = 1;
    
}


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
            
            totalItens += item.subtotalItem;
            c(".products-cart").appendChild(itemNovo);
        });
    }
    c(".total-cart").innerHTML = "R$ "+totalItens.toFixed(2).replace(".",",");
};
const abrirCarrinho = () => {
    // if(carrinho.length > 0){
    //     c('.modal-cart').style.opacity = 0;
    //     c('.modal-cart').style.display = 'flex';
    //     setTimeout(()=>{
    //         c('.modal-cart').style.opacity = 1;
    //     },100);
    //     c("header").style.position = "static";
    // }
    if(carrinho.length > 0){
        c('.cart-side').classList.add("showCart");
        c("header").style.position = "static";
    }
}
const fecharCarrinho = () => {
    c('.cart-side').classList.remove("showCart");
    c("header").style.position = "fixed";
}
c(".box--cart").addEventListener("click",abrirCarrinho);
c(".fechar-carrinho").addEventListener("click",fecharCarrinho);



const finalizarCompra = () => {
    sessionStorage.setItem("pedido",JSON.stringify(carrinho));
    let a = document.createElement('a');
    a.href = "pedido.php";
    a.click();
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
    if(carrinho[indexAr].quantidade == 1) {
        carrinho.splice(indexAr,1);
        attCarrinho();
    }
    if(carrinho[indexAr].quantidade>1) {
        let precoUnit = carrinho[indexAr].subtotalItem / parseInt(carrinho[indexAr].quantidade);
        carrinho[indexAr].quantidade = parseInt(carrinho[indexAr].quantidade) - 1;
        carrinho[indexAr].subtotalItem = precoUnit * +carrinho[indexAr].quantidade;
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
const toggleMenuMobile = () => {
    if( c(".menu-mobile").classList.contains("close") ){
        c("#categorias").style.marginLeft = "0px";
        c(".menu-mobile").style.marginLeft = "-40px";
        c('.menu-mobile').classList.remove("close");
    } else {
        c("#categorias").style.marginLeft = "-220px";
        c(".menu-mobile").style.marginLeft = "0px";
        c('.menu-mobile').classList.add("close");
    }
}
c(".menu-mobile").addEventListener("click",toggleMenuMobile);
document.addEventListener("keydown",(e)=>{
    if(e.keyCode === 27 && c("#title-product").innerText != "Title do Produto") {
        closeModal();
    }
    if(e.keyCode === 27 && c(".total-cart").innerText != "0") {
        if(carrinho.length < 1) {
            fecharCarrinho();        
        }
    }
});