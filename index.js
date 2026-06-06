  let listaProdutosApi = [];

  const listaProdutos = document.getElementById("listaProdutos");

  const areaDetalhe = document.getElementById("areaDetalhe");
  const detalheImagem = document.getElementById("detalheImagem");
  const detalheCategoria = document.getElementById("detalheCategoria");
  const detalheTitulo = document.getElementById("detalheTitulo");
  const detalheDescricao = document.getElementById("detalheDescricao");
  const detalhePreco = document.getElementById("detalhePreco");

  const areaCompra = document.getElementById("areaCompra");
  const inputCep = document.getElementById("inputCep");

  const resultadoCep = document.getElementById("resultadoCep");
  const cepTitulo = document.getElementById("cepTitulo");
  const cepRua = document.getElementById("cepRua");
  const cepBairro = document.getElementById("cepBairro");
  const cepCidade = document.getElementById("cepCidade");
  const cepEstado = document.getElementById("cepEstado");

  async function carregarProdutos() {
    console.log("[PRODUTOS] Buscando produtos");

    const resposta = await fetch("https://fakestoreapi.com/products");
    const produtos = await resposta.json();

    listaProdutosApi = produtos;

    mostrarProdutos();
  }

  function mostrarProdutos() {
    listaProdutos.innerHTML = "";

    listaProdutosApi.forEach(function(produto) {
      listaProdutos.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card produto-card shadow-sm">
            <img src="${produto.image}" class="card-img-top produto-img">

            <div class="card-body d-flex flex-column">
              <p class="categoria">${produto.category}</p>

              <h5 class="card-title">${produto.title}</h5>

              <p class="preco mt-auto">
                R$ ${produto.price.toFixed(2)}
              </p>

              <button class="btn btn-primary w-100" onclick="abrirProduto(${produto.id})">
                Ver produto
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  function abrirProduto(idProduto) {
    console.log("[PRODUTO] ID clicado:", idProduto);

    const produto = listaProdutosApi.find(function(item) {
      return item.id === idProduto;
    });

    detalheImagem.src = produto.image;
    detalheImagem.alt = produto.title;

    detalheCategoria.innerText = produto.category;
    detalheTitulo.innerText = produto.title;
    detalheDescricao.innerText = produto.description;
    detalhePreco.innerText = "R$ " + produto.price.toFixed(2);

    areaDetalhe.classList.remove("d-none");
    areaCompra.classList.add("d-none");

    limparResultadoCep();

    window.location = "#areaDetalhe";
  }

  function abrirCompra() {
    console.log("[COMPRA] Abrindo compra");

    areaCompra.classList.remove("d-none");
    inputCep.value = "";

    limparResultadoCep();
  }

  async function buscarCep() {
    let cep = inputCep.value;

    cep = cep.trim();
    cep = cep.replace("-", "");

    console.log("[CEP] Buscando CEP:", cep);

    if (cep.length !== 8) {
      mostrarMensagemCep("warning", "Digite um CEP válido com 8 números.");
      return;
    }

    mostrarMensagemCep("info", "Buscando endereço...");

    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const endereco = await resposta.json();

    if (endereco.erro) {
      mostrarMensagemCep("danger", "CEP não encontrado.");
      return;
    }

    resultadoCep.className = "alert alert-success mt-3";

    cepTitulo.innerText = "Endereço encontrado:";
    cepRua.innerText = "Rua: " + endereco.logradouro;
    cepBairro.innerText = "Bairro: " + endereco.bairro;
    cepCidade.innerText = "Cidade: " + endereco.localidade;
    cepEstado.innerText = "Estado: " + endereco.uf;
  }

  function mostrarMensagemCep(tipo, mensagem) {
    resultadoCep.className = "alert alert-" + tipo + " mt-3";

    cepTitulo.innerText = mensagem;
    cepRua.innerText = "";
    cepBairro.innerText = "";
    cepCidade.innerText = "";
    cepEstado.innerText = "";
  }

  function limparResultadoCep() {
    resultadoCep.className = "alert mt-3 d-none";

    cepTitulo.innerText = "";
    cepRua.innerText = "";
    cepBairro.innerText = "";
    cepCidade.innerText = "";
    cepEstado.innerText = "";
  }

  carregarProdutos();