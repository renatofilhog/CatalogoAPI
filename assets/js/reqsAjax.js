var dadosProduto = [];

const tratarJSON = (resultado) => {
    let res = JSON.parse(resultado);


    // // Descrição/nome: item.produto.descricao
    // // Categoria: item.produto.categoria.descricao
    // // Estoque: item.produto.estoqueAtual
    // // Imagem link: item.produto.imageThumbnail
    // // Preço: item.produto.preco
    // // idProduto: item.produto.id
    // // skuProduto: item.produto.codigo
    // // Descrição curta: item.produto.descricaoCurta
    res.forEach((item)=>{
        let estoque = item.estoque;
        let imgSrc = item.imgsrc;
        let cloneBoxProduto = c(".model .product--box").cloneNode("TRUE");
        
        cloneBoxProduto.addEventListener("click",()=>{openModal(cloneBoxProduto);});

        if(item.imgsrc == "noimg"){
            imgSrc = "./assets/img/semimg.png";
        }

        cloneBoxProduto.querySelector(".product--img img").src = imgSrc;
        cloneBoxProduto.querySelector(".product--infos h4").setAttribute("data-sku",item.sku);
        cloneBoxProduto.querySelector(".product--infos h4").setAttribute("data-id",item.id);
        cloneBoxProduto.querySelector(".product--infos h4").innerHTML = item.nome;
        cloneBoxProduto.querySelector(".product--infos p").innerHTML = item.categoria;
        cloneBoxProduto.querySelector(".descricaoModal").innerHTML = item.descricao;
        cloneBoxProduto.querySelector(".product--infos h2").innerHTML = `R$ ${parseFloat(item.preco).toFixed(2).replace(".",",")}`;
        cloneBoxProduto.querySelector(".product--infos h2").setAttribute("data-estoque",estoque);
        c(".area--produtos").appendChild(cloneBoxProduto);
        let it = {
            "imgSrc":imgSrc,
            "skuProduto":item.sku,
            "idProduto":item.id,
            "nomeProduto":item.nome,
            "categoria":item.categoria,
            "descricaoCurta":item.descricao,
            "preco":parseFloat(item.preco),
            "estoque":estoque
        };
        dadosProduto.push(it);
        
    });

}
const ordenarPorEstoque = (arr) => {
    arr.sort(
        (a,b)=>{
            if(a.estoque < b.estoque){
                return true;
            } else {
                return -1;
            }
        }
    );
}


//variavel para controle de registros retornados
let pagina = 0;
let qntReg = 60;
//function carrega
function carrega(){
    $('#loading').html(" <!-- <img src='assets/img/loader.gif'/> --> Carregando...").fadeIn('slow');
    $.ajax({
        type: "POST",
        url: "./assets/php/loadAjax.php",
        data: "page="+pagina,//variavel passada via post 
        cache: false,
        success: function(html){
            setTimeout(() => {
                tratarJSON(html);	
            }, 700);
            
            $('#loading').fadeOut('fast');
            //$("#content").append(html);//mostra resultado na div content
        },
        error:function(html){
            $('#loading').html("erro...").fadeIn('slow');
        }
    });
};
function pegarProdutos(){
    $.ajax({
        type: "POST",
        url: "./assets/php/loadAjax.php",
        data: false, 
        cache: false,
        success: function(html){
            setTimeout(() => {
                guardarInVar(html);	
            }, 700);
        },
        error:function(html){
            $('#loading').html("erro...").fadeIn('slow');
        }
    });
};

//funcao de controle do scroll da pagina, na qual ela chega ao fim � acionada chamando
		//minha function carrega novamente para trazer mais dados dinamicamente
		$(window).scroll(function(){
			if($(window).scrollTop() + $(window).height() >= $(document).height()){
				pagina += qntReg;
				carrega();
			};
		});


// Categorias
const tratarCategorias = (resultado)=> {
    let res = JSON.parse(resultado);
    res.forEach((item)=>{
        let nomeCategoria = item.categoria.toLowerCase();
        let cloneCategoria = c(".modelCategoria li").cloneNode('TRUE');
        cloneCategoria.innerHTML = "<span class='color-site'>&#10004;</span> "+nomeCategoria;
        cloneCategoria.addEventListener("click",()=>{
            switchCategoria(item.categoria);
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
                tratarCategorias(html);	
            }, 300);
        },
        error:function(html){
            $('#loading').html("erro...").fadeIn('slow');
        }
    });
}

//chama minha funcao ao carregar a pagina
$(document).ready(function(){
    carrega();
    puxarCategorias();
});