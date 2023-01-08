document.querySelector("body").innerHTML = "OLA MUNDO <br>";
let pagina = 1;
let qnt = 40;
const options = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: `page=${pagina}&qnt=${qnt}`
};

fetch("./assets/php/loadProdutos.php",options).then((response)=>{
    response.json().then((html)=>{
        let arr = html.items;
        arr.forEach((item)=>{
            const optionsPreco = {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
                body: `produto=[${item.colors[0].products[0].code}]`
            };
            fetch("./assets/php/loadPreco.php",optionsPreco).then((response)=>{
                response.json().then((k)=>{
                    console.log(k.items[0].prices[0].price);
                })
            });
        });
        //console.log(html.items);
        
    });
});

const buscarCategoria = (arr)=>{
    const found = arr.find((el)=>{
        return el.typeCode == 105;
    });
    return found.name
}