const optionsStock = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: `reference=003 BB CST001T`
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



let cloneTRStock = document.querySelector(".model-stock").cloneNode("TRUE");
cloneTRStock.classList.remove("model-stock");
