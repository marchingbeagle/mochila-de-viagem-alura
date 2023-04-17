const formulario = document.getElementById("novoItem");
const lista = document.querySelector("#lista");
const itens = [];

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = event.target.elements["nome"].value;
  const quantidade = event.target.elements["quantidade"].value;

  criaElemento(nome, quantidade);
  limpaFormulario(nome, quantidade, event);
});

function criaElemento(nome, quantidade) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = quantidade;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += nome;

  armazenaDados(nome, quantidade);
  adicionaElemento(novoItem);
}

function adicionaElemento(elemento) {
  lista.appendChild(elemento);
}

function limpaFormulario(nome, quantidade, event) {
  const elementos = event.target.elements;
  for (i = 0; i < elementos.length; i++) {
    elementos[i].value = "";
  }
  elementos["adicionar"].value = "Adicionar";
}

function armazenaDados(nome, quantidade) {
  const itensObjeto = {
    nome: nome,
    quantidade: quantidade,
  };

  itens.push(itensObjeto);

  localStorage.setItem("item", JSON.stringify(itens));
}
