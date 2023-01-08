<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/img/icone.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="assets/img/icone.png" />
    <link rel="stylesheet" href="assets/css/pedido.css">
    <title>Pedido</title>
</head>
<body>
    <header>
        <p>Obrigado por comprar conosco. Abaixo as instruções para que possamos finalizar.</p>
        <ol>
            <li>Confira os produtos e quantidades</li>
            <li><a href="#" id="btnImg">Clique aqui</a> e será baixado uma imagem com o pedido</li>
            <li>A imagem baixada geralmente ficará em seus downloads, só compartilhe com o vendedor para que o mesmo possa fazer seu pedido em definitivo</li>
            <li>Caso não tenha contatos de vendedores, <a>clique aqui</a></li>
        </ol>
    </header>
    <div class="models">
        <div class="item model">
            <div class="group">
                <h4>Item:</h4> <p id="item">1</p>
            </div>
            <div class="group">
                <h4>SKU Produto:</h4> <p id="sku">SKU de teste do produto</p>
            </div>
            <div class="group">
                <h4>Nome Produto:</h4> <p id="nome">Felipe bit no bit do prod</p>
            </div>
            <div class="group">
                <h4>Preço Unitário:</h4> <p id="preco">R$ 123,00</p>
            </div>
            <div class="group">
                <h4>Quantidade:</h4> <p id="quantidade">8</p>
            </div>
            <div class="group">
                <h4>Subtotal:</h4> <p id="subtotal">R$ 984,00</p>
            </div>
        </div>
    </div>
    <main>
        <div class="tab">
            <div class="resumo">
                <h3>Resumo</h3>
                <p id="data"></p>
                <h4>Quantidade de itens:  <span id="totalQt">8</span> </h4>
                <h4>Total: <span id="total">R$ 984,00</span> </h4>
            </div>
        </div>
    </main>
    <footer>
        <img src="assets/img/logo.png">
        <div class="info">
            <p>Bebetenkite Comercial LTDA</p>
            <p>CNPJ: 11.301.092/0001-66</p>
        </div>
    </footer>
    <script src="assets/js/html2canvas.min.js"></script>
    <script src="assets/js/pedido.js"></script>
</body>
</html>