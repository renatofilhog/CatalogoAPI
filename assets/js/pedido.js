window.onload = ()=>{
    let pedido = sessionStorage.getItem("pedido");
    if(pedido != null){
        pedido = JSON.parse(pedido);
        console.log(pedido);
        let total = 0;
        let quantidade = 0;
        pedido.forEach((item,index) => {
            let element = document.querySelector(".item.model").cloneNode("TRUE");
            element.querySelector("#item").innerHTML = index+1;
            element.querySelector("#sku").innerHTML = item.skuProduto;
            element.querySelector("#nome").innerHTML = item.nomeProduto;
            element.querySelector("#preco").innerHTML = `R$ ${(item.subtotalItem / item.quantidade).toFixed(2).replace(".",",")}`;
            element.querySelector("#quantidade").innerHTML = item.quantidade;
            element.querySelector("#subtotal").innerHTML = `R$ ${item.subtotalItem.toFixed(2).replace(".",",")}`;
            // Alimentando as variáveis totais:
            total += item.subtotalItem;
            quantidade += item.quantidade;
            //adicionando ao html
            document.querySelector(".tab").appendChild(element);
        });
        let now = new Date();
        let dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
        let monName = new Array ("", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
        let hoje = `${dayName[now.getDay()]}, ${now.getDate()} de ${monName[now.getMonth()]} de ${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`;
        document.querySelector("#data").innerHTML = hoje;
        document.querySelector("#totalQt").innerHTML = quantidade;
        document.querySelector("#total").innerHTML = "R$ "+total.toFixed(2).replace(".",",");
    } else {
        let a = document.createElement('a');
        a.href = "index.html";
        a.click();
    }
}


document.querySelector("#btnImg").addEventListener("click",()=>{
    let container = document.body; // full page 
    let data = new Date();
    let dataPedido = `${data.getDate()}-${data.getMonth()}-${data.getFullYear()} ${data.getHours()}-${data.getMinutes()}`;
    html2canvas(container).then(function(canvas) {
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.download = dataPedido+"RDF_FORTALEZA.png";
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
    });
});