<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Catálogo RDF</title>
</head>
<body>
    <div class="modal--product">
        <div class="container--modal">
            <div class="product-image">
                <img src="https://rosadodesertofortaleza.com.br/wp-content/uploads/2021/11/15097609429_Akira20II203-1.png">
            </div>
            <div class="product-infos">
                <div class="exit-modal">x</div>
                <h1 id="title-product" data-sku="">Title do Produto</h1>
                <h4 id="cat-product">Categoria Produto</h4>
                <p class="desc">
                    Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
                    labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi
                    animcupidatat
                </p>
                <h3>Estoque: <span id="qt-estoq">2</span></h3>
                <h2 id="price-product">R$ 450,00</h2>
                <div class="button-cart">
                    <div class="sep">
                        <div class="quantidade">
                            <button class="minus">-</button>
                            <div class="qt-prod">1</div>
                            <button class="plus">+</button>
                        </div>
                    </div>
                    <div class="but">
                        <button id="add-product-cart">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal-cart">
        <div class="cart-side">
            <div class="head-cart">
                <h1>Carrinho  &#128722;</h1>
                <div class="fechar-carrinho">x</div>
            </div>
            <div class="body-cart">
                <div class="model">
                    <div class="item-cart">
                        <div class="img-nome-cart">
                            <div class="miniatura-imagem">
                                <img src="">
                            </div>
                            <h3 class="nome-produto-carrinho"></h3>
                        </div>
                        <div class="box-qt">
                            <p class="price-cart"></p>
                            <div class="qt-cart">
                                <button class="qt-cart-minus">-</button>
                                <div class="qt-cart-prod">1</div>
                                <button class="qt-cart-plus">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="products-cart">
                    
                </div>
            </div>
            <div class="footer-cart">
                <button>Finalizar</button>
                <div class="total-cart">
                    R$ 4.004,00
                </div>
            </div>
        </div>
    </div>
    <header class="container">
        <div class="search--area">
            <img src="assets/img/lupa.png">
            <input type="text" name="search" id="search--global" placeholder="O que você procura ?">
        </div>
        <div class="logo--area">
            <img src="assets/img/logoRDF.png">
        </div>
        <div class="cart--area">
            <div class="box--cart">
                <div class="qnt-box">0</div>
                &#128722;
            </div>
        </div>
    </header>
    <main>
        <div class="container main">
            <aside id="categorias">
                <div class="modelCategoria">
                    <li><span class="color-site">&#10004;</span>Rosas</li>
                </div>
                <h3>Categorias</h3>
                <ul id="listaCategorias">
                    <li class="active" onclick="switchCategoria('tudo')"><span class="active color-site">&#10004;</span> Tudo</li>
                </ul>
            </aside>
            <section id="produtos">
                <h3 class="color-site" id="categoriaAtual"><span class="active color-site">&#10004;</span> Tudo</h3>
                <div class="model">
                    <div class="product--box">
                        <div class="product--img">
                            <img src="">
                        </div>
                        <div class="product--infos">
                            <h4 data-sku="socotraac115"></h4>
                            <p></p>
                            <p class="descricaoModal"></p>
                            <h2 class="color-site"></h2>
                        </div>
                    </div>
                </div>
                <div class="area--produtos">
                    <div id="loading"></div>
                </div>
            </section>
        </div>
    </main>
    <script src="assets/js/jquery.min152.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/reqsAjax.js"></script>
</body>
</html>