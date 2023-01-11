var dadosProduto = [];

// puxar categoria:
const buscarCategoria = (arr)=>{
    const found = arr.find((el)=>{
        return el.typeCode == 105;
    });
    return found.name
}

const tratarJSON = (res) => {
    if(res.retorno == false){
        c(".area--produtos").innerHTML = "Não há mais registros";
    }

    // // Descrição/nome: item.produto.descricao
    // // Categoria: item.produto.categoria.descricao
    // // Estoque: item.produto.estoqueAtual
    // // Imagem link: item.produto.imageThumbnail
    // // Preço: item.produto.preco
    // // idProduto: item.produto.id
    // // skuProduto: item.produto.codigo
    // // Descrição curta: item.produto.descricaoCurta
    res.forEach((item)=>{

        /// categoria
        const categoria = item.colors[0].products[0].classifications.find((el)=>{
            return el.typeCode == 105;
        });
        
        
        
        //let estoque = item.estoque;
        let cloneBoxProduto = c(".model .product--box").cloneNode("TRUE");
        
        cloneBoxProduto.addEventListener("click",()=>{openModal(cloneBoxProduto);});

        //imgSrc = "./assets/img/semimg.png";

        descricao = 'Produto de cor: '+item.colorName;
        descricao += '<br>Tamanho: '+item.size;
        descricao += '<br>Referencia: '+item.lastReferenceCode;
        
        cloneBoxProduto.querySelector(".product--infos h4").setAttribute("data-sku",item.ReferenceCode);
        cloneBoxProduto.querySelector(".product--infos h4").setAttribute("data-id",item.productCode);
        cloneBoxProduto.querySelector(".product--infos h4").innerHTML = item.name;
        cloneBoxProduto.querySelector(".product--infos p").innerHTML = categoria.name + " " + item.ReferenceCode;
        cloneBoxProduto.querySelector(".descricaoModal").innerHTML = descricao;
        cloneBoxProduto.querySelector(".product--img img").src = "assets/img/semimg.png";
        const imgSrc = item.colors[0].products[0].additionalFields.find((el)=>{
             if(el.code == 4){
                 cloneBoxProduto.querySelector(".product--img img").src = el.value;    
             }
        });
        //console.log(item.colors[0].products[0].code);
        let optionsPreco = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
            body: `produto=${item.colors[0].products[0].code}`
        };
        cloneBoxProduto.querySelector(".product--infos h2").innerHTML = 'R$ --,--';
        fetch("./assets/php/loadPreco.php",optionsPreco).then((response)=>{
            response.json().then((k)=>{
                let pr = k.items[0].prices[0].price;
                cloneBoxProduto.querySelector(".product--infos h2").innerHTML = `R$ ${parseFloat(pr).toFixed(2).replace(".",",")}`;
            })
        });        
        cloneBoxProduto.querySelector(".product--infos h2").setAttribute("data-estoque",1);
        
        c(".area--produtos").appendChild(cloneBoxProduto);
        // let it = {
        //     "imgSrc":imgSrc,
        //     "skuProduto":item.sku,
        //     "idProduto":item.id,
        //     "nomeProduto":item.nome,
        //     "categoria":item.categoria,
        //     "descricaoCurta":item.descricao,
        //     "preco":parseFloat(item.preco),
        //     "estoque":estoque
        // };
        // dadosProduto.push(it);
        
    });

}

//variavel para controle de registros retornados
let pagina = 1;
let qntReg = 20;
let ordenacao = "padrao";
let categ = "padrao";
//function carrega
function carrega(){
    $('#loading').html(" <!-- <img src='assets/img/loader.gif'/> --> Carregando...").fadeIn('slow');
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `page=${pagina}`
    };
    fetch("./assets/php/loadProdutos.php",options).then((response)=>{
        response.json().then((html)=>{
            tratarJSON(html.items);
            $('#loading').fadeOut('fast');
        });
    });
};
c("#ordenar").addEventListener("change", (el)=>{
    if (ordenacao != c("#ordenar").value){
        ordenacao = c("#ordenar").value;
        c(".area--produtos").innerHTML = "";
        carrega();
    }
    
});
var noLoad = 0;
//funcao de controle do scroll da pagina, na qual ela chega ao fim � acionada chamando
		//minha function carrega novamente para trazer mais dados dinamicamente
		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() >= $(document).height() && noLoad==0){
                if(c("#listaCategorias").getAttribute("data-catAtiva") == "tudo"){
                    pagina ++;
				    carrega();
                } else {
                    pagina ++;
                    categ = c("#listaCategorias").getAttribute("data-catAtiva");
                    carrega();
                } 
			};

            // Função subir topo
            if($(window).scrollTop() > 0 && modalOpen==0) {
                c(".subir-topo").style.display = "flex";
            } else {
                c(".subir-topo").style.display = "none";
            }
		});

c(".subir-topo").addEventListener("click",()=> {
    window.scrollTo({top:0,behavior: "smooth"});
});

// Categorias
const tratarCategorias = (resultado)=> {
    let res = resultado.items;
    
    res.forEach((item)=>{
        let nomeCategoria = item.name.toLowerCase();
        let cloneCategoria = c(".modelCategoria li").cloneNode('TRUE');
        cloneCategoria.innerHTML = "<span class='color-site'>&#10004;</span> "+nomeCategoria;
        cloneCategoria.addEventListener("click",()=>{
            switchCategoria(nomeCategoria);
        });
        c("#listaCategorias").appendChild(cloneCategoria);
    });
    
}

const puxarCategorias = ()=> {
    $.ajax({
        type: "POST",
        url: "./assets/php/loadCategorias.php",
        cache: false,
        success: function(html){
            setTimeout(() => {
                tratarCategorias(JSON.parse(html));
            }, 300);
        },
        error:function(html){
            $('#loading').html("erro...").fadeIn('slow');
        }
    });
}

const switchCategoria = (cat) => {
    if(cat=="tudo"){
        c("#listaCategorias li.active").classList.remove("active");
        c("#listaCategorias li span.active").classList.remove("active");
        let item = c("#listaCategorias li:first-child");
        item.classList.add("active");
        item.querySelector("span").classList.add("active");
        c("#categoriaAtual").innerHTML = c("#categorias ul li.active:not(span)").innerHTML;
        
        c(".area--produtos").innerHTML = "";
        pagina = 0;
        carrega();

    } else {
        let nomeCategoria;
        cs("#listaCategorias li").forEach((item)=>{
            let newCat = cat.toLowerCase().trim();
            if(item.innerText.toLowerCase().trim() == newCat){
                nomeCategoria = item;
            }
        });
        c("#listaCategorias li.active").classList.remove("active");
        c("#listaCategorias li span.active").classList.remove("active");
        
        nomeCategoria.classList.add("active");
        nomeCategoria.querySelector("span").classList.add("active");
        c("#categoriaAtual").innerHTML = c("#categorias ul li.active:not(span)").innerHTML;
        
        c("#listaCategorias").setAttribute("data-catAtiva",cat);
        c(".area--produtos").innerHTML = "";
        pagina = 0;
        categ = cat;
        carrega();
    }
}


//chama minha funcao ao carregar a pagina
$(document).ready(function(){
    carrega();
    puxarCategorias();
});


/*
function carregaSearch(search){
    $('#loading').html(" <!-- <img src='assets/img/loader.gif'/> --> Carregando...").fadeIn('slow');
    $.ajax({
        type: "POST",
        url: "./assets/php/loadProdutosSearch.php",
        data: {"search":search},//variavel passada via post 
        cache: false,
        success: function(html){
            setTimeout(() => {
                tratarJSON(html);	
            }, 700);
            $('#loading').fadeOut('fast');
        },
        error:function(html){
            $('#loading').html("erro...").fadeIn('slow');
        }
    });
};

c("#search--global").addEventListener("keyup",(e)=>{
    if(c("#search--global").value.length > 3){
        let digitado = c("#search--global").value;
        c(".area--produtos").innerHTML = "";
        noLoad = 1;
        carregaSearch(digitado);
        
    }
});

*/