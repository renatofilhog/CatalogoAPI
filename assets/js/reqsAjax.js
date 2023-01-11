const tratarJSON = (res) => {
    if(res.length == 1){
        if(res[0].code=="PageNotFound"){
            c("#loading").innerHTML = "Não há mais registros";
            noLoad = 1;
        } else {
            c("#loading").innerHTML = "Erro API";
            noLoad = 1;
        }
    } else {
        res.items.forEach((item)=>{
            /// categoria
            const categoria = item.colors[0].products[0].classifications.find((el)=>{
                return el.typeCode == 105;
            });
            
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
            
        });
    }

}

//variavel para controle de registros retornados
let pagina = 1;
let qntReg = 20;
var codeCategoria = "null";
//function carrega
function carrega(){
    $('#loading').html(" <!-- <img src='assets/img/loader.gif'/> --> Carregando...").fadeIn('slow');
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
        body: `page=${pagina}&categoria=${codeCategoria}`
    };
    fetch("./assets/php/loadProdutos.php",options).then((response)=>{
        response.json().then((html)=>{
            tratarJSON(html);
            $('#loading').fadeOut('fast');
        });
    });
};

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
    resultado.items.forEach((item)=>{
        let cloneCategoria = c(".modelCategoria li").cloneNode('TRUE');
        cloneCategoria.innerHTML = "<span class='color-site'>&#10004;</span> "+item.name.toLowerCase();
        cloneCategoria.addEventListener("click",()=>{
            switchCategoria(item.code);
        });
        cloneCategoria.setAttribute('data-codecat',item.code);
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
    let itemCat = c("#listaCategorias li[data-codecat='"+cat+"']");
    c("#listaCategorias li.active").classList.remove("active");
    c("#listaCategorias li span.active").classList.remove("active");

    itemCat.classList.add("active");
    itemCat.querySelector("span").classList.add("active");
    c("#categoriaAtual").innerHTML = c("#categorias ul li.active:not(span)").innerHTML;

    c("#listaCategorias").setAttribute("data-catAtiva",cat);
    c(".area--produtos").innerHTML = "";
    pagina = 1;
    codeCategoria = cat;
    noLoad = 0;
    carrega();
}


//chama minha funcao ao carregar a pagina
$(document).ready(function(){
    carrega();
    puxarCategorias();
});